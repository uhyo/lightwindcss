import { css } from "lightwindcss";
import Head from "next/head";

export default function Home() {
  return (
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
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main
        className={css`
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        `}
      >
        <h1
          className={css`
            margin: 0;
            line-height: 1.15;
            font-size: 4rem;
            text-align: center;
          `}
        >
          Welcome to{" "}
          <a
            href="https://nextjs.org"
            className={css`
              color: #0070f3;
              text-decoration: none;

              &:hover,
              &:focus,
              &:active {
                text-decoration: underline;
              }
            `}
          >
            Next.js!
          </a>
        </h1>

        <p
          className={css`
            line-height: 1.5;
            font-size: 1.5rem;
            text-align: center;
          `}
        >
          Get started by editing{" "}
          <code
            className={css`
              background: #fafafa;
              border-radius: 5px;
              padding: 0.75rem;
              font-size: 1.1rem;
              font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
                DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New,
                monospace;
            `}
          >
            pages/index.js
          </code>
        </p>

        <div
          className={css`
            display: flex;
            align-items: center;
            justify-content: center;
            flex-wrap: wrap;
            max-width: 800px;
            margin-top: 3rem;

            @media (max-width: 600px) {
              width: 100%;
              flex-direction: column;
            }
          `}
        >
          <a href="https://nextjs.org/docs" className={card}>
            <h3 className={cardTitle}>Documentation &rarr;</h3>
            <p className={cardDesc}>
              Find in-depth information about Next.js features and API.
            </p>
          </a>

          <a href="https://nextjs.org/learn" className={card}>
            <h3 className={cardTitle}>Learn &rarr;</h3>
            <p className={cardDesc}>
              Learn about Next.js in an interactive course with quizzes!
            </p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/master/examples"
            className={card}
          >
            <h3 className={cardTitle}>Examples &rarr;</h3>
            <p className={cardDesc}>
              Discover and deploy boilerplate example Next.js projects.
            </p>
          </a>

          <a
            href="https://vercel.com/import?filter=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={card}
          >
            <h3 className={cardTitle}>Deploy &rarr;</h3>
            <p className={cardDesc}>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>

      <footer
        className={css`
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        `}
      >
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
          className={css`
            display: flex;
            justify-content: center;
            align-items: center;
          `}
        >
          Powered by{" "}
          <img
            src="/vercel.svg"
            alt="Vercel Logo"
            className={css`
              margin-left: 0.5em;
              height: 1em;
            `}
          />
        </a>
      </footer>
    </div>
  );
}

const card = css`
  margin: 1rem;
  flex-basis: 45%;
  padding: 1.5rem;
  text-align: left;
  color: inherit;
  text-decoration: none;
  border: 1px solid #eaeaea;
  border-radius: 10px;
  transition: color 0.15s ease, border-color 0.15s ease;

  &:hover,
  &:focus,
  &:active {
    color: #0070f3;
    border-color: #0070f3;
  }
`;

const cardTitle = css`
  margin: 0 0 1rem 0;
  font-size: 1.5rem;
`;

const cardDesc = css`
  margin: 0;
  font-size: 1.25rem;
  line-height: 1.5;
`;
