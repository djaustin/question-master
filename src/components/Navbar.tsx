import { Flex, Heading, HStack, VStack } from "@chakra-ui/layout";
import { Button, IconButton } from "@chakra-ui/react";
import { useColorMode, useColorModeValue } from "@chakra-ui/system";
import { signOut } from "next-auth/client";
import { FiMoon, FiSun } from "react-icons/fi";
import React from "react";
import { DarkModeToggle } from "./DarkModeToggle";

export const Navbar = () => {
  const { toggleColorMode } = useColorMode();
  return (
    <Flex
      bg={`teal.${useColorModeValue(500, 900)}`}
      h="50px"
      px={5}
      align="center"
      justify="space-between"
      color="white"
    >
      <Heading color="white" size="lg">
        Results Page
      </Heading>
      <HStack spacing="4">
        <DarkModeToggle variant="link" color="white" />
        <Button
          size="xs"
          variant="outline"
          color="white"
          onClick={() => signOut()}
        >
          Sign out
        </Button>
      </HStack>
    </Flex>
  );
};
