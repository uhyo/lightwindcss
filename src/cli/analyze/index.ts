import fastGlob from "fast-glob";
import { writeFile } from "fs/promises";
import path from "path";
import { AnalyzeContext } from "./context";
import { generate, GenerateResult } from "./generate";
import { parseFile } from "./parseFile";

type Options = {
  srcDir: string;
  out: string;
};

export type AnalyzeResult = GenerateResult;

export async function analyze({ srcDir, out }: Options) {
  const context: AnalyzeContext = {
    kvCount: new Map(),
  };
  const cwd = path.resolve(srcDir);
  for await (const file of fastGlob.stream("**/*.{js,jsx,ts,tsx}", {
    cwd,
    ignore: ["node_modules"],
  })) {
    const filePath = path.join(cwd, String(file));
    await parseFile(filePath, context);
  }
  const result = generate(context);
  await writeFile(path.resolve(out), JSON.stringify(result));
}
