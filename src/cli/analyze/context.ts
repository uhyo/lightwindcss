import { Splitter } from "../../util/Splitter";

export const CONTEXT_DELIMITER = "::::";

export const RULESET_DELIMITER = "$$$$";

// context:prop:value
type NodeKey = `${string}${typeof CONTEXT_DELIMITER}${string}${typeof CONTEXT_DELIMITER}${string}`;

export type AnalyzeContext = {
  nodes: Splitter<
    NodeKey,
    {
      count: number;
    }
  >;
};
