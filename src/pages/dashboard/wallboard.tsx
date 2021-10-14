import { Feedback } from ".prisma/client";
import { Box, HStack, Stack } from "@chakra-ui/layout";
import {
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/number-input";
import React, { useState } from "react";
import useSWR from "swr";
import { DarkModeToggle } from "../../components/DarkModeToggle";
import { DashboardNavigation } from "../../components/DashboardNavigation";
import { ResultSummary } from "../../components/ResultSummary";
import { requireLogin } from "../../integrations/authentication";
import fetcher from "../../integrations/jsonFetcher";
import Head from 'next/head'

const format = (value) => `${value || 0}s`;
const parse = (value) => parseInt(value.replace(/s/, ""));

const Wallboard = () => {
  const [interval, setInterval] = useState(0);
  const { data, error } = useSWR<Feedback[]>("/api/feedback", fetcher, {
    refreshInterval: interval * 1000,
  });
  if (error) return "error";
  if (!data) return "loading...";
  return (
    <Box p="4">
      <Head>
        <title>Wallboard</title>
      </Head>
      <Stack
        direction={{ base: "column", md: "row" }}
        justify="space-between"
        align="center"
      >
        <HStack>
          <NumberInput
            maxW="80px"
            value={format(interval)}
            onChange={(value) => setInterval(parse(value))}
            size="sm"
            allowMouseWheel
            min={0}
          >
            <NumberInputField aria-label="Refresh interval" />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </HStack>
        <HStack>
          <DarkModeToggle variant="outline" size="sm" />
          <DashboardNavigation />
        </HStack>
      </Stack>
      <ResultSummary data={data} />
    </Box>
  );
};

export default Wallboard;

export const getServerSideProps = requireLogin();
