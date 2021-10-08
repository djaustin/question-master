import { HStack, Link } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React from "react";

export const DashboardNavigation = () => {
  const { asPath } = useRouter();

  return (
    <HStack>
      <Link as={NextLink} href="/dashboard/results">
        <Button
          isActive={!!asPath.match(/results/i)}
          variant="outline"
          size="sm"
        >
          Results Table
        </Button>
      </Link>
      <Link as={NextLink} href="/dashboard/summary">
        <Button
          isActive={!!asPath.match(/summary/i)}
          variant="outline"
          size="sm"
        >
          Summary
        </Button>
      </Link>
      <Link as={NextLink} href="/dashboard/wallboard">
        <Button variant="outline" size="sm">
          Wallboard
        </Button>
      </Link>
    </HStack>
  );
};
