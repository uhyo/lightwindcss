import { parse } from "@babel/parser";
import traverse from "@babel/traverse";
import * as types from "@babel/types";
import { readFile } from "fs/promises";
import { findCssReferences } from "../../ast/findCssReferences";
import { AnalyzeContext } from "./context";
import { analyzeReference } from "./references";

export async function parseFile(filePath: string, context: AnalyzeContext) {
  const parsed = parse(await readFile(filePath, "utf8"), {
    strictMode: true,
    sourceType: "module",
    plugins: ["jsx", "typescript"],
  });

  traverse(parsed, {
    ImportDeclaration(path) {
      const references = findCssReferences(path, types);
      for (const ref of references) {
        analyzeReference(ref, context);
      }
    },
  });
}
