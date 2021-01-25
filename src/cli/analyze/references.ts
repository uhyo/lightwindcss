import { Node, NodePath } from "@babel/traverse";
import { analyzeStylisElement } from "../../ast/analyzeStylisElement";
import { parseCss } from "../../ast/parseCss";
import { updateMap } from "../../util/updateMap";
import { AnalyzeContext, CONTEXT_DELIMITER } from "./context";

export function analyzeReference(
  reference: NodePath<Node>,
  context: AnalyzeContext
) {
  const res = parseCss(reference);
  if (!res) {
    return;
  }

  for (const elm of res.ast) {
    for (const [ruleContext, prop, value] of analyzeStylisElement(elm)) {
      const key = `${ruleContext}${CONTEXT_DELIMITER}${prop}${CONTEXT_DELIMITER}${value}`;
      updateMap(context.kvCount, key, 0, (c) => c + 1);
    }
  }
}
