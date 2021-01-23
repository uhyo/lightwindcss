import { convertCSSStringToStyle } from "./convertCSSStringToStyle";

const cache = new WeakMap<TemplateStringsArray, string>();

/**
 * Convert given CSS string to a style object.
 */
export function css(
  arr: TemplateStringsArray,
  ..._args: readonly never[]
): string {
  const c = cache.get(arr);
  if (c) {
    return c;
  }

  const { style, className } = convertCSSStringToStyle(arr[0] || "");
  cache.set(arr, className);
  return className;
}
