import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "next-auth/client";
import { AppProps } from "next/app";
import "react-datepicker/dist/react-datepicker.css";
import "../css/datePicker.css";
import theme from "../theme";

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
