import { convertCSSStringToStyle } from "./convertCSSStringToStyle";

const cache = new WeakMap<TemplateStringsArray, string>();
const registry =
  typeof FinalizationRegistry !== "undefined"
    ? new FinalizationRegistry((heldValue: HTMLStyleElement) => {
        console.log("cleaning", heldValue);
        heldValue.remove();
      })
    : undefined;

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

  if (style && registry) {
    registry.register(arr, style);
  }
  return className;
}
