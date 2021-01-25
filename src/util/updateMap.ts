/**
 * Update Map value using given function.
 */
export function updateMap<K, V>(
  map: Map<K, V>,
  key: K,
  defaultValue: V,
  update: (value: V) => V
) {
  map.set(key, update(map.has(key) ? (map.get(key) as V) : defaultValue));
}
