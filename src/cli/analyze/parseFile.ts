import { parse } from "@babel/parser";
import traverse from "@babel/traverse";
import { isImportSpecifier, isStringLiteral } from "@babel/types";
import { readFile } from "fs/promises";
import { AnalyzeContext } from "./context";
import { analyzeReference } from "./references";

export async function parseFile(filePath: string, context: AnalyzeContext) {
  const parsed = parse(await readFile(filePath, "utf8"), {
    strictMode: true,
    sourceType: "module",
    plugins: ["jsx", "typescript"],
  });

  traverse(parsed, {
    ImportDeclaration(path) {
      if (path.node.source.value !== "lightwindcss") {
        return;
      }
      // found a lightwindcss import
      // Look for 'css' import
      const csses = path.node.specifiers.flatMap((spec) => {
        if (!isImportSpecifier(spec)) {
          return [];
        }
        const importedName = spec.imported;
        const isCss = isStringLiteral(importedName)
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
      for (const ref of references) {
        analyzeReference(ref, context);
      }
    },
  });
}
