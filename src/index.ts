import type { CSSProperties } from "react";
import { convertCSSStringToObject } from "./convertCSSStringToObject";

const cache = new WeakMap<TemplateStringsArray, CSSProperties>();

/**
 * Convert given CSS string to a style object.
 */
export function css(
  arr: TemplateStringsArray,
  ..._args: readonly never[]
): CSSProperties {
  const c = cache.get(arr);
  if (c) {
    return c;
  }

  const result = convertCSSStringToObject(arr[0] || "");
  cache.set(arr, result);
  return result;
}
