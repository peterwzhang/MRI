import "../styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { IntlProvider } from "react-intl";
import HeroBanner from "../components/HeroBanner";
import Navbar from "../components/Navbar";

function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <IntlProvider locale="en">
        <HeroBanner />
        <Navbar />
        <Component {...pageProps} />
        <ReactQueryDevtools initialIsOpen={false} />
      </IntlProvider>
    </QueryClientProvider>
  );
}

export default App;
