import "../styles/globals.css";
import Head from "next/head";
import type { AppProps } from "next/app";
import HeroBanner from "../components/HeroBanner";

function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Head>
        <title>MRI Project</title>
        <meta name="description" content="CS 495 Capstone project" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HeroBanner />
      <Component {...pageProps} />
    </div>
  );
}

export default App;
