import fastGlob from "fast-glob";
import path from "path";
import { AnalyzeContext } from "./context";
import { parseFile } from "./parseFile";

type Options = {
  srcDir: string;
  out: string;
};

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
  console.log({ srcDir, out });
}
