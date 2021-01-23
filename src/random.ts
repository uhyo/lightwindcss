/**
 * Create random classname.
 */
export function createRandomClassname(): string {
  return `c-${random16bytes()}${random16bytes()}-${random16bytes()}-${random16bytes()}-${random16bytes()}-${random16bytes()}${random16bytes()}${random16bytes()}`;
}

function random16bytes(): string {
  return String((Math.random() * 65536) | 0);
}
