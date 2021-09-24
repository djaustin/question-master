import { extendTheme, withDefaultColorScheme } from "@chakra-ui/react";

const fonts = { mono: `'Menlo', monospace` };

const theme = extendTheme(withDefaultColorScheme({ colorScheme: "teal" }), {
  colors: {
    black: "#16161D",
  },
  fonts,
});

export default theme;
