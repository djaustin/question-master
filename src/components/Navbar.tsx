import { Flex, Heading, HStack, VStack } from "@chakra-ui/layout";
import { Button, IconButton } from "@chakra-ui/react";
import { useColorMode, useColorModeValue } from "@chakra-ui/system";
import { signOut } from "next-auth/client";
import { FiMoon, FiSun } from "react-icons/fi";
import React from "react";

export const Navbar = () => {
  const { toggleColorMode } = useColorMode();
  return (
    <Flex
      bg="teal.500"
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
        <IconButton
          variant="link"
          color="white"
          onClick={() => toggleColorMode()}
          icon={useColorModeValue(<FiMoon />, <FiSun />)}
          aria-label="toggle dark mode"
        />

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
