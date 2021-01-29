<img src="./docs/images/lightwindcss-logo.png" alt="Lightwind CSS" width="559">

## What?

As you know, [Tailwind CSS](https://tailwindcss.com/) is great. Particularly, it has succeeded to cut off “C” of CSS from modern styling architectures. Also, there is no idea of local styles; all classes are global, which helps reducing total CSS size.

However, there is one pain point; you have to remember all those Tailwind-specific classes. You still have to spare your brain space for those extra memorization drills in addition to knowledge of plain CSS which is still required to use Tailwind CSS.

Then, what if you can write plain CSS directly in JSXs and still benefit from the efficiency of global styles?

Here it is.

## How?

LightwindCSS analyzes all source code and generate one optimized CSS file. Source code is then transformed with our Babel plugin to match the generated CSS file.

For example, suppose you wrote following React code:

```tsx
<div
  className={css`
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
  `}
>
  <main
    className={css`
      display: flex;
      flex-flow: column nowrap;
      justify-content: center;
      align-items: center;
    `}
  >
    Hello, world!
  </main>
</div>
```

Then, LightwindCSS generates this CSS file:

```css
.a {
  display: flex;
  justify-content: center;
}
.b {
  flex-flow: row nowrap;
}
.c {
  flex-flow: column nowrap;
  align-items: center;
}
```

and the JSX code is transformed into:

```tsx
<div className="a b">
  <main className="a c">Hello, world!</main>
</div>
```

Here, one or more declarations correspond to one classname, similarly to how TailwindCSS maintains one-to-one relations between classnames and concrete styles.

## Installation

```sh
npm i -D lightwindcss
```

## Usage

Wrap your plain CSS string with `` css` ... ` `` to get classNames for it.

```tsx
import { css } from "lightwindcss";

<div
  className={css`
    min-height: 100vh;
    padding: 0 0.5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `}
>
  Hello, world!
</div>;
```

During development, this works without extra configuration.

### Production Build

For production, Lightwind CSS can analyze all source code and generate one optimized CSS file.

First, analyze source code and generate `lightwindcss.json` by the following command:

```sh
lightwindcss analyze src/
```

Then, generate CSS file by:

```sh
lightwindcss generate
```

The `lightwindcss.json` file is also used to convert the `` css`...` `` call to optimized classnames. To this end, a babel plugin `ligutwindcss/babel` needs to be enabled in production builds:

```js
// .babelrc.js
module.exports = (api) => ({
  plugins: api.env("production")
    ? [
        [
          "lightwindcss/babel",
          {
            analysisFile: "./lightwindcss.json",
          },
        ],
      ]
    : [],
});
```

## Examples

See a Next.js example in `examples/`.

## Contributing

Welcome

## License

MIT
