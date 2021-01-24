type Options = {
  srcDir: string;
  out: string;
};

export async function analyze({ srcDir, out }: Options) {
  console.log({ srcDir, out });
}
