export function* iterMap<T, U>(
  iter: Iterable<T>,
  mapper: (elm: T) => U
): Generator<U, void, void> {
  for (const v of iter) {
    yield mapper(v);
  }
}
