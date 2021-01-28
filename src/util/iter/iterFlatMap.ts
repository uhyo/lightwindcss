export function* iterFlatMap<T, U>(
  iter: Iterable<T>,
  mapper: (elm: T) => Iterable<U>
): Generator<U, void, undefined> {
  for (const v of iter) {
    yield* mapper(v);
  }
}
