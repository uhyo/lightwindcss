import md5 from "md5";
import { compile, serialize, stringify } from "stylis";

type Result = {
  style?: HTMLStyleElement;
  className: string;
};

export function convertCSSStringToStyle(str: string): Result {
  const className = `c-${md5(str)}`;
  const compiled = serialize(compile(`.${className}{${str}}`), stringify);

  if (typeof document === "undefined") {
    return {
      className,
    };
  }

  const style = document.createElement("style");
  style.textContent = compiled;
  style.nonce = document.currentScript?.nonce;
  document.head.appendChild(style);

  return {
    style,
    className,
  };
}
