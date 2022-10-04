import "../styles/globals.css";
import Head from "next/head";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

function App({ Component, pageProps }: AppProps) {

  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
    );
}

export default App;
