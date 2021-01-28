import { readFile, writeFile } from "fs/promises";
import path from "path";
import { AnalyzeResult } from "../analyze";
import { RULESET_DELIMITER } from "../analyze/context";

type Options = {
  input: string;
  out: string;
};

export async function generate({ input, out }: Options) {
  const file = await readFile(path.resolve(input), "utf8");
  const analysisResult: AnalyzeResult = JSON.parse(file);
  const { ruleContextMap, classnameMap } = analysisResult;

  let result = "";

  for (const [ruleContext, classes] of Object.entries(ruleContextMap)) {
    const rulesets = ruleContext
      .split(RULESET_DELIMITER)
      .filter((x) => x !== "");
    const wrapper = convertRulesetsToWrapper(rulesets);
    for (const c of classes) {
      result += wrapper(c, classnameMap[c]?.[ruleContext] || "");
    }
  }
  await writeFile(path.resolve(out), result);
}

function convertRulesetsToWrapper(
  rulesets: string[]
): (c: string, v: string) => string {
  let prefix = "";
  let selector = "`.${c}`";
  let suffix = "";
  for (const r of rulesets) {
    if (r.startsWith("@")) {
      // at-rule
      prefix += escape(r) + "{";
      suffix = "}" + suffix;
    } else {
      // not at-rule
      selector = `\`${
        // &\f is marked by stylis
        r.replace(/&\f/g, "${" + selector + "}")
      }\``;
    }
  }

  return new Function(
    "c",
    "v",
    `return \`${prefix}\${${selector}}{\${v}}${suffix}\``
  ) as (c: string, v: string) => string;

  function escape(str: string) {
    return str.replace(/`/g, "\\`");
  }
}
