import { AnalyzeContext, CONTEXT_DELIMITER } from "./context";
import { generateClassnames } from "./generateClassnames";

export type GenerateResult = {
  /**
   * Map from rule context to classnames.
   */
  ruleContextMap: Record<string, string[]>;
  /**
   * Map from classname and ruleContext to declaration.
   */
  classnameMap: Record<string, Record<string, string>>;
  /**
   * Map from declaration to classname.
   */
  declarationMap: Record<string, string>;
};

/**
 * Generate analysis result.
 */
export function generate(context: AnalyzeContext): GenerateResult {
  const entries = Array.from(context.nodes.entries());
  // sort desc by occurences
  entries.sort((a, b) => b.payload.count - a.payload.count);

  // assign classnames
  const classnameGenerator = generateClassnames();
  const ruleContextMap: Record<string, string[]> = Object.create(null);
  const classnameMap: Record<string, Record<string, string>> = Object.create(
    null
  );
  const declarationMap: Record<string, string> = Object.create(null);

  for (const node of entries) {
    const assignedClassnameRes = classnameGenerator.next();
    if (assignedClassnameRes.done) {
      // unreachable
      throw new Error("Cannot assign more classnames");
    }
    const assignedClassname = assignedClassnameRes.value;
    const declPerContext: Record<string, string> = {};
    classnameMap[assignedClassname] = declPerContext;
    for (const key of node.keys) {
      const [ruleContext, decl, value] = key.split(CONTEXT_DELIMITER) as [
        string,
        string,
        string
      ];
      const a = ruleContextMap[ruleContext];
      if (a) {
        a.push(assignedClassname);
      } else {
        ruleContextMap[ruleContext] = [assignedClassname];
      }
      declPerContext[ruleContext] =
        (declPerContext[ruleContext] || "") + `${decl}:${value};`;
      declarationMap[key] = assignedClassname;
    }
  }

  return {
    ruleContextMap,
    classnameMap,
    declarationMap,
  };
}
