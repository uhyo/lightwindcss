/**
 * https://drafts.csswg.org/cssom/#css-property-to-idl-attribute
 */
export function cssPropertyToIDLAttribute(property: string): string {
  return property.replace(/-([a-z])/g, (_, char) => char.toUpperCase());
}
