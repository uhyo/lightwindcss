// character ranges, avoiding unused code points
// https://ja.wikipedia.org/wiki/Unicode%E4%B8%80%E8%A6%A7_0000-0FFF
const defaultCharRanges: readonly [number, number][] = [
  // ascii a-z
  [0x61, 0x7a],
  // non-ascii chars
  [0xa1, 0x377],
  [0x3a3, 0x52f],
  [0x61f, 0x6ff],
];

/**
 * Generate valid classnames.
 * Earlier names have shorter length.
 */
export function* generateClassnames(
  prefix = "",
  charRanges = defaultCharRanges
) {
  for (let length = 1; ; length++) {
    yield* generateClassnamesOfLength(prefix, charRanges, length);
  }
}

export function* generateClassnamesOfLength(
  prefix: string,
  charRanges: readonly [number, number][],
  length: number
): Generator<string, void, void> {
  if (length === 1) {
    yield* classnameChar(charRanges, prefix);
    return;
  }
  for (const c of classnameChar(charRanges, "")) {
    yield* generateClassnamesOfLength(prefix + c, charRanges, length - 1);
  }
}

function* classnameChar(
  charRanges: readonly [number, number][],
  prefix: string
) {
  for (const [start, end] of charRanges) {
    for (let char = start; char <= end; char++)
      yield prefix + String.fromCharCode(char);
  }
}
