#!/usr/bin/env node

import yargs from "yargs/yargs";
import { analyze } from "./analyze";
import { generate } from "./generate";

const args = yargs(process.argv.slice(2))
  .scriptName("lightwindcss")
  .command<{
    dir: string;
    input: string;
    out: string;
  }>("analyze [dir]", "analyze given directory", (yargs) => {
    yargs
      .positional("dir", {
        description: "Directory to analyze",
        default: "./",
      })
      .option("out", {
        alias: "o",
        description: "File to write analysis result",
        type: "string",
        default: "./lightwindcss.json",
      });
  })
  .command("generate [input]", "generate CSS file", (yargs) => {
    yargs
      .positional("input", {
        description: "Analyzed JSON file",
        default: "./lightwindcss.json",
      })
      .option("out", {
        alias: "o",
        description: "File to write generated CSS",
        type: "string",
        default: "./lightwind.css",
      });
  })
  .demandCommand(1)
  .help()
  .strict().argv;

(async () => {
  switch (args._[0]) {
    case "analyze": {
      await analyze({
        srcDir: args.dir,
        out: args.out,
      });
      break;
    }
    case "generate": {
      await generate({
        input: args.input,
        out: args.out,
      });
      break;
    }
  }
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
