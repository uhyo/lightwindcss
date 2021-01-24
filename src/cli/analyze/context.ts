export const CONTEXT_DELIMITER = "::::";

export const RULESET_DELIMITER = "$$$$";

export type AnalyzeContext = {
  // context:prop:value
  kvCount: Map<
    `${string}${typeof CONTEXT_DELIMITER}${string}${typeof CONTEXT_DELIMITER}${string}`,
    number
  >;
};
