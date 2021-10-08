import {
  Container,
  HStack,
  Input,
  Stack,
  VStack,
  Text,
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

export const Summary = () => {
  const { data, error } = useSWR<Feedback[]>("/api/feedback", fetcher);
  const scoreCount = useMemo(() => _.groupBy(data, "score"), [data]);
  console.log(scoreCount);
  if (error) return "error";
  if (!data) return "loading...";
  return (
    <>
      <Navbar />
      <Container mt="8" maxW="container.lg">
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
        <Stack
          mt="8"
          justify="space-between"
          direction={{ base: "column", md: "row" }}
        >
          <ResponseCount variant="very unhappy" count={scoreCount[1].length} />
          <ResponseCount variant="unhappy" count={scoreCount[2].length} />
          <ResponseCount variant="neutral" count={scoreCount[3].length} />
          <ResponseCount variant="happy" count={scoreCount[4].length} />
          <ResponseCount variant="very happy" count={scoreCount[5].length} />
        </Stack>
        <Stack mt="8" w="full" direction={{ base: "column", md: "row" }}>
          <VStack flexGrow={1}>
            <Text alignSelf="start">Response Breakdown</Text>
          </VStack>
          <VStack flexGrow={2}>
            <Text alignSelf="start">All Responses</Text>
          </VStack>
        </Stack>
        <Text>All Feedback Comments</Text>
        <ResultsTable feedback={data} />
      </Container>
    </>
  );
};

export const getServerSideProps = requireLogin();

export default Summary;
