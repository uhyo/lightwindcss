import { AnalyzeContext, CONTEXT_DELIMITER } from "./context";
import { generateClassnames } from "./generateClassnames";

export type GenerateResult = {
  /**
   * Map from rule context to classnames.
   */
  ruleContextMap: Record<string, string[]>;
  /**
   * Map from classname to declaration.
   */
  classnameMap: Record<string, string>;
  /**
   * Map from declaration to classname.
   */
  declarationMap: Record<string, string>;
};

/**
 * Generate analysis result.
 */
export function generate(context: AnalyzeContext): GenerateResult {
  const entries = Array.from(context.kvCount.entries());
  // sort desc by occurences
  entries.sort((a, b) => b[1] - a[1]);

  // assign classnames
  const classnameGenerator = generateClassnames();
  const ruleContextMap: Record<string, string[]> = Object.create(null);
  const classnameMap: Record<string, string> = Object.create(null);
  const declarationMap: Record<string, string> = Object.create(null);

  for (const [key] of entries) {
    const [ruleContext, decl, value] = key.split(CONTEXT_DELIMITER) as [
      string,
      string,
      string
    ];
    const assignedClassnameRes = classnameGenerator.next();
    if (assignedClassnameRes.done) {
      // unreachable
      throw new Error("Cannot assign more classnames");
    }
    const assignedClassname = assignedClassnameRes.value;
    const a = ruleContextMap[ruleContext];
    if (a) {
      a.push(assignedClassname);
    } else {
      ruleContextMap[ruleContext] = [assignedClassname];
    }
    classnameMap[assignedClassname] = `${decl}:${value};`;
    declarationMap[key] = assignedClassname;
  }

  return {
    ruleContextMap,
    classnameMap,
    declarationMap,
  };
}
