import { useColorModeValue } from "@chakra-ui/color-mode";
import { HStack } from "@chakra-ui/layout";
import React from "react";
import { Button, useColorMode, Text } from "@chakra-ui/react";


export default function NavHeader() {
  const {toggleColorMode} = useColorMode();
  
  return (
    <HStack display="flex" justify="space-between" alignItems="center">
      <Text border="solid" >Logo</Text>
      <Button
        onClick={toggleColorMode}>
        {useColorModeValue("Dark Mode", "Light Mode")}
      </Button>
    </HStack>
  );
}