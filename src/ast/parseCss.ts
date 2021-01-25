import { Node, NodePath } from "@babel/traverse";
import { compile, Element } from "stylis";

export type ParseCssResult = {
  ast: Element[];
  replacePath: NodePath<Node>;
};

/**
 * Convert 'css' reference to a parsed Stylis AST.
 */
export function parseCss(
  reference: NodePath<Node>
): ParseCssResult | undefined {
  // Support css`...` calls
  if (!reference.isIdentifier()) {
    return;
  }
  const { parentPath } = reference;
  if (!parentPath.isTaggedTemplateExpression()) {
    return;
  }
  if (parentPath.node.tag !== reference.node) {
    return;
  }
  // Currently we only support no hole template literals
  const cssStr = String(parentPath.node.quasi.quasis[0]?.value.cooked);

  const ast = compile(cssStr);
  return {
    ast,
    replacePath: parentPath,
  };
}
