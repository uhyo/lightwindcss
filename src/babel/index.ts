import { Visitor } from "@babel/traverse";
import type * as types from "@babel/types";
import { readFileSync } from "fs";
import path from "path";
import { analyzeStylisElement } from "../ast/analyzeStylisElement";
import { findCssReferences } from "../ast/findCssReferences";
import { parseCss } from "../ast/parseCss";
import { AnalyzeResult } from "../cli/analyze";
import { CONTEXT_DELIMITER } from "../cli/analyze/context";
import { iterJoin } from "../util/iter/iterJoin";

type PluginThis = {
  opts: {
    /**
     * File to load.
     */
    analysisFile?: string;
  };
  data: AnalyzeResult;
};

type PluginInput = {
  types: typeof types;
};
type PluginResult = {
  pre(this: PluginThis): void;
  visitor: Visitor<PluginThis>;
};

const plugin = function (babel: PluginInput): PluginResult {
  const types = babel.types;

  const data = new Map<string, AnalyzeResult>();

  return {
    pre() {
      const analyzeFile = path.resolve(
        this.opts.analysisFile || "./lightwindcss.json"
      );
      if (data.has(analyzeFile)) {
        this.data = data.get(analyzeFile)!;
      } else {
        data.set(
          analyzeFile,
          (this.data = JSON.parse(readFileSync(analyzeFile, "utf8")))
        );
      }
    },
    visitor: {
      ImportDeclaration(path) {
        // console.log(state);
        const references = findCssReferences(path, types);
        for (const ref of references) {
          const res = parseCss(ref);
          if (!res) {
            continue;
          }
          const classNames = new Set<string>();
          for (const c of res.ast) {
            for (const k of analyzeStylisElement(c)) {
              const key = k.join(CONTEXT_DELIMITER);
              const className = this.data.declarationMap[key];
              if (!className) {
                throw path.buildCodeFrameError(
                  "Could not find className for this."
                );
              }
              classNames.add(className);
            }
          }
          res.replacePath.replaceWith(
            types.stringLiteral(iterJoin(classNames, " "))
          );
        }
      },
    },
  };
};

export default plugin;
