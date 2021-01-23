import md5 from "md5";
import { compile, serialize, stringify } from "stylis";

type Result = {
  style?: HTMLStyleElement;
  className: string;
};

export function convertCSSStringToStyle(str: string): Result {
  const className = `c-${md5(str)}`;
  if (typeof document === "undefined") {
    return {
      className,
    };
  }

  const existingStyle = document.querySelector(
    `style[data-lightwind="${className}"]`
  );
  if (existingStyle) {
    return {
      style: existingStyle as HTMLStyleElement,
      className,
    };
  }
  const compiled = serialize(compile(`.${className}{${str}}`), stringify);

  const style = document.createElement("style");
  style.textContent = compiled;
  style.nonce = document.currentScript?.nonce;
  style.dataset.lightwind = className;
  document.head.appendChild(style);

  return {
    style,
    className,
  };
}
