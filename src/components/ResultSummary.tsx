import { VStack, Stack, Box, Text, BoxProps } from "@chakra-ui/layout";
import { Feedback } from "@prisma/client";
import React, { useMemo } from "react";
import FeedbackPieChart from "./FeedbackPieChart";
import { ResponseCount } from "./ResponseCount";
import ResultsTable from "./ResultsTable";
import _ from "lodash";

export type ResultSummaryProps = {
  data: Feedback[];
  dateRange?: string;
} & BoxProps;

export const ResultSummary: React.FC<ResultSummaryProps> = ({
  data,
  dateRange,
  ...boxProps
}) => {
  const scoreCount = useMemo(() => _.groupBy(data, "score"), [data]);
  return (
    <Box {...boxProps}>
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
        <VStack align="start">
          <Text fontWeight="bold" textTransform="uppercase" alignSelf="start">
            Response Breakdown
          </Text>
          <Box w="400px">
            <FeedbackPieChart data={data} />
          </Box>
        </VStack>
        <VStack flexGrow={1}>
          <Text fontWeight="bold" textTransform="uppercase" alignSelf="start">
            All Responses
          </Text>
          <ResultsTable
            w="full"
            hiddenColumns={["Comment", "Username", "Address"]}
            h="400px"
            overflow="auto"
            dateRange={dateRange}
          />
        </VStack>
      </Stack>
      <Text mt="20" fontWeight="bold" textTransform="uppercase">
        All Feedback Comments
      </Text>
      <ResultsTable maxW="100vw" overflowX="auto" canFilter dateRange={dateRange}/>
      </Box>
  );
};
