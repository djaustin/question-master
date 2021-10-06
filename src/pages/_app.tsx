import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "next-auth/client";

import theme from "../theme";
import { AppProps } from "next/app";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <Provider session={session}>
        <Component {...pageProps} />
      </Provider>
    </ChakraProvider>
  );
}

export default MyApp;
