import yargs from "yargs/yargs";
import { analyze } from "./analyze";

const args = yargs(process.argv.slice(2))
  .scriptName("lightwindcss")
  .command<{
    dir: string;
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
  .demandCommand(1)
  .help()
  .strict().argv;

if (args._[0] === "analyze") {
  analyze({
    srcDir: args.dir,
    out: args.out,
  }).catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
