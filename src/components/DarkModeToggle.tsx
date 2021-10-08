import {
  IconButton,
  IconButtonProps,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { FiMoon, FiSun } from "react-icons/fi";

export const DarkModeToggle = (props: Partial<IconButtonProps>) => {
  const { toggleColorMode } = useColorMode();
  return (
    <IconButton
      onClick={() => toggleColorMode()}
      icon={useColorModeValue(<FiMoon />, <FiSun />)}
      aria-label="toggle dark mode"
      {...props}
    />
  );
};
