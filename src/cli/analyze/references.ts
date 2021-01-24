import { Node, NodePath } from "@babel/traverse";
import { compile, Element } from "stylis";
import { updateMap } from "../../util/updateMap";
import {
  AnalyzeContext,
  CONTEXT_DELIMITER,
  RULESET_DELIMITER,
} from "./context";

export function analyzeReference(
  reference: NodePath<Node>,
  context: AnalyzeContext
) {
  // Support css`...` calls
  if (!reference.isIdentifier()) {
    return;
  }
  const { parentPath } = reference;
  if (!parentPath.isTaggedTemplateExpression()) {
    return;
  }
  if (parentPath.node.tag !== reference.node) {
    return;
  }
  // Currently we only support no hole template literals
  const cssStr = String(parentPath.node.quasi.quasis[0]?.value.cooked);
  console.log(cssStr);

  const ast = compile(cssStr);

  for (const elm of ast) {
    analyzeStylisElement(elm, context, "");
  }
  console.log(context.kvCount);
}

function analyzeStylisElement(
  element: Element,
  context: AnalyzeContext,
  ruleContext: string
) {
  // TODO: stylis typing is not very good
  switch (element.type) {
    case "decl": {
      // prop: value;
      const key = `${ruleContext}${CONTEXT_DELIMITER}${element.props}${CONTEXT_DELIMITER}${element.children}`;
      updateMap(context.kvCount, key, 0, (c) => c + 1);
      break;
    }
    case "rule": {
      // selector { ... }
      const nextRuleContext = `${ruleContext}${RULESET_DELIMITER}${element.value}`;
      for (const c of element.children as Element[]) {
        analyzeStylisElement(c, context, nextRuleContext);
      }
      break;
    }
    case "comm": {
      // ignore comments
      break;
    }
    default: {
      // @media and else
      // @media (...) { ... }
      const nextRuleContext = `${ruleContext}${RULESET_DELIMITER}${element.value}`;
      for (const c of element.children as Element[]) {
        analyzeStylisElement(c, context, nextRuleContext);
      }
    }
  }
}
