import { Element } from "stylis";
import { RULESET_DELIMITER } from "../cli/analyze/context";

/**
 * Analyze given element.
 */
export function* analyzeStylisElement(
  element: Element,
  ruleContext: string = ""
): Generator<[string, string, string], void, void> {
  // TODO: stylis typing is not very good
  switch (element.type) {
    case "decl": {
      // prop: value;
      yield [ruleContext, String(element.props), String(element.children)];
      break;
    }
    case "rule": {
      // selector { ... }
      const nextRuleContext = `${ruleContext}${RULESET_DELIMITER}${element.value}`;
      for (const c of element.children as Element[]) {
        yield* analyzeStylisElement(c, nextRuleContext);
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
        yield* analyzeStylisElement(c, nextRuleContext);
      }
    }
  }
}
