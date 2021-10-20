import { VStack, Stack, Box, Text } from "@chakra-ui/layout";
import { Feedback } from "@prisma/client";
import React, { useMemo, useState } from "react";
import FeedbackPieChart from "./FeedbackPieChart";
import { ResponseCount } from "./ResponseCount";
import ResultsTable from "./ResultsTable";
import _ from "lodash";

export type ResultSummaryProps = {
  data: Feedback[];
  dateRange?: string;
};

export const ResultSummary: React.FC<ResultSummaryProps> = ({ data, dateRange }) => {
  const scoreCount = useMemo(() => _.groupBy(data, "score"), [data]);
  return (
    <>
      <VStack>
        <Text
          mt="8"
          fontWeight="bold"
          textTransform="uppercase"
          alignSelf="start"
        >
          Responses by Score
        </Text>
        <Stack
          w="full"
          justify="space-between"
          direction={{ base: "column", md: "row" }}
        >
          <ResponseCount variant="very unhappy" count={scoreCount[1]?.length} />
          <ResponseCount variant="unhappy" count={scoreCount[2]?.length} />
          <ResponseCount variant="neutral" count={scoreCount[3]?.length} />
          <ResponseCount variant="happy" count={scoreCount[4]?.length} />
          <ResponseCount variant="very happy" count={scoreCount[5]?.length} />
        </Stack>
      </VStack>
      <Stack
        spacing="16"
        mt="20"
        w="full"
        direction={{ base: "column", md: "row" }}
      >
        <VStack flexGrow={1}>
          <Text fontWeight="bold" textTransform="uppercase" alignSelf="start">
            Response Breakdown
          </Text>
          <Box w="300px">
            <FeedbackPieChart data={data} />
          </Box>
        </VStack>
        <VStack flexGrow={2}>
          <Text fontWeight="bold" textTransform="uppercase" alignSelf="start">
            All Responses
          </Text>
          <ResultsTable
            w="full"
            hiddenColumns={["Comment", "Username", "Address"]}
            h="300px"
            overflow="auto"
            dateRange={dateRange}
          />
        </VStack>
      </Stack>
      <Text mt="20" fontWeight="bold" textTransform="uppercase">
        All Feedback Comments
      </Text>
      <ResultsTable maxW="100vw" overflowX="auto" canFilter dateRange={dateRange}/>
    </>
  );
};
