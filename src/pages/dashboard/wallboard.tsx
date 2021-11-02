import { Text } from "@chakra-ui/react";
import { Box, HStack, Stack } from "@chakra-ui/layout";
import {
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/number-input";
import React, { useState } from "react";
import { DarkModeToggle } from "../../components/DarkModeToggle";
import { DashboardNavigation } from "../../components/DashboardNavigation";
import { ResultSummary } from "../../components/ResultSummary";
import { requireLogin } from "../../integrations/authentication";
import Head from "next/head";
import DatePicker from "../../components/DatePicker";
import { get24HrsAgoDateParam, useDateFilter } from "../../hooks/useDateFilter";

const format = (value) => `${value || 0}s`;
const parse = (value) => parseInt(value.replace(/s/, ""));

const Wallboard = () => {
  const [interval, setInterval] = useState(0);
  const { feedbackData, setDateFilter, error } = useDateFilter(interval * 1000);
  const dateRangeParam = get24HrsAgoDateParam();
  const [dateRange, setDateRange ] = useState(dateRangeParam);

  if (error) return "error";
  return (
    <Box p="4">
      <Head>
        <title>Feedback: Wallboard</title>
      </Head>
      <Stack
        direction={{ base: "column", md: "row" }}
        justify="space-between"
        align="center"
      >
        <HStack>
          <DatePicker
              onRangeChange={setDateFilter}
              setDateRangeExternal={setDateRange}
            />
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
      {feedbackData ? (
          <ResultSummary data={feedbackData} dateRange={dateRange} />
        ) : (
          <Text>Loading...</Text>
        )}    
      </Box>
  );
};

export default Wallboard;

export const getServerSideProps = requireLogin();
