import { NodePath } from "@babel/traverse";
import * as types from "@babel/types";
import { ImportDeclaration, Node } from "@babel/types";

export function findCssReferences(
  path: NodePath<ImportDeclaration>,
  t: typeof types
): NodePath<Node>[] {
  if (path.node.source.value !== "lightwindcss") {
    return [];
  }
  // found a lightwindcss import
  // Look for 'css' import
  const csses = path.node.specifiers.flatMap((spec) => {
    if (!t.isImportSpecifier(spec)) {
      return [];
    }
    const importedName = spec.imported;
    const isCss = t.isStringLiteral(importedName)
      ? importedName.value === "css"
      : importedName.name === "css";
    if (!isCss) {
      return [];
    }
    // Found css.
    return [spec.local];
  });
  // List all references to css.
  const references = csses.flatMap((id) => {
    const binding = path.scope.getBinding(id.name);
    return binding?.referencePaths || [];
  });
  return references;
}
