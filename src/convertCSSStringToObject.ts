import { CSSProperties } from "react";
import { compile } from "stylis";
import { cssPropertyToIDLAttribute } from "./IDLAttribute";

export function convertCSSStringToObject(str: string): CSSProperties {
  const compiled = compile(str);

  const result: Record<string, string> = {};
  for (const elm of compiled) {
    if (elm.type === "decl") {
      // TODO: fix stylis typing
      result[cssPropertyToIDLAttribute(String(elm.props))] = String(
        elm.children
      );
    }
  }

  return result;
}
