import { Node, NodePath } from "@babel/traverse";
import { analyzeStylisElement } from "../../ast/analyzeStylisElement";
import { parseCss } from "../../ast/parseCss";
import { iterFlatMap } from "../../util/iter/iterFlatMap";
import { iterMap } from "../../util/iter/iterMap";
import { AnalyzeContext, CONTEXT_DELIMITER } from "./context";

export function analyzeReference(
  reference: NodePath<Node>,
  context: AnalyzeContext
) {
  const res = parseCss(reference);
  if (!res) {
    return;
  }

  context.nodes.apply(
    Array.from(
      iterFlatMap(res.ast, (elm) =>
        iterMap(
          analyzeStylisElement(elm),
          ([ruleContext, prop, value]) =>
            `${ruleContext}${CONTEXT_DELIMITER}${prop}${CONTEXT_DELIMITER}${value}`
        )
      )
    )
  );
}
