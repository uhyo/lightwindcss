export function iterJoin<T>(iter: Iterable<T>, delimiter: string): string {
  let result = "";
  let first = true;
  for (const v of iter) {
    if (!first) {
      result += delimiter;
    }
    first = false;
    result += v;
  }
  return result;
}
