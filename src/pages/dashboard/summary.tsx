import {
  Container,
  HStack,
  Input,
  Stack,
  VStack,
  Text,
  Heading,
  Box,
} from "@chakra-ui/react";
import React, { useMemo } from "react";
import useSWR from "swr";
import { DashboardNavigation } from "../../components/DashboardNavigation";
import { Navbar } from "../../components/Navbar";
import { ResponseCount } from "../../components/ResponseCount";
import { requireLogin } from "../../integrations/authentication";
import fetcher from "../../integrations/jsonFetcher";
import _ from "lodash";
import { Feedback } from ".prisma/client";
import ResultsTable from "../../components/ResultsTable";
import FeedbackPieChart from "../../components/FeedbackPieChart";

export const Summary = () => {
  const { data, error } = useSWR<Feedback[]>("/api/feedback", fetcher);
  const scoreCount = useMemo(() => _.groupBy(data, "score"), [data]);
  console.log(scoreCount);
  if (error) return "error";
  if (!data) return "loading...";
  return (
    <>
      <Navbar />
      <Container mt="8" maxW="container.xl">
        <Stack
          direction={{ base: "column", md: "row" }}
          justify="space-between"
          align="center"
        >
          <HStack spacing="2">
            <Input placeholder="From" size="sm" w="200px" />
            <Input placeholder="To" size="sm" w="200px" />
          </HStack>
          <DashboardNavigation />
        </Stack>
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
            <ResponseCount
              variant="very unhappy"
              count={scoreCount[1].length}
            />
            <ResponseCount variant="unhappy" count={scoreCount[2].length} />
            <ResponseCount variant="neutral" count={scoreCount[3].length} />
            <ResponseCount variant="happy" count={scoreCount[4].length} />
            <ResponseCount variant="very happy" count={scoreCount[5].length} />
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
              hiddenColumns={["Comment", "Username"]}
              h="300px"
              overflow="auto"
              feedback={data}
            />
          </VStack>
        </Stack>
        <Text mt="20" fontWeight="bold" textTransform="uppercase">
          All Feedback Comments
        </Text>
        <ResultsTable canFilter feedback={data} />
      </Container>
    </>
  );
};

export const getServerSideProps = requireLogin();

export default Summary;
