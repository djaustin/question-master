import { Flex, Heading, HStack, Link } from "@chakra-ui/layout";
import { Avatar, Button, IconButton, Tooltip } from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/system";
import { signOut, useSession } from "next-auth/client";
import NextLink from "next/link";
import React from "react";
import { FiSettings } from "react-icons/fi";
import { DarkModeToggle } from "./DarkModeToggle";

export type NavbarProps = {
  title?: string;
};

export const Navbar: React.FC<NavbarProps> = ({
  title = "Admin Dashboard",
}) => {
  const [session] = useSession()

  return (
    <Flex
      bg={`teal.${useColorModeValue(500, 900)}`}
      h="50px"
      px={5}
      align="center"
      justify="space-between"
    >
      <Heading color="white" size="lg">
        <Link cursor="pointer" href="/dashboard" as={NextLink}>
          {title}
        </Link>
      </Heading>
      <HStack spacing="4">
        <Link href="/dashboard/config" as={NextLink}>
          <IconButton
            color="white"
            variant="link"
            aria-label="open settings"
            icon={<FiSettings />}
            />
        </Link>
        <DarkModeToggle variant="link" color="white" />
        {session && <Tooltip label={session.user.name} ><Avatar size='sm' name={session.user.name} /></Tooltip>}
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
