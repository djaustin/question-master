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
import { ResultSummary } from "../../components/ResultSummary";

export const Summary = () => {
  const { data, error } = useSWR<Feedback[]>("/api/feedback", fetcher);
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
        <ResultSummary data={data} />
      </Container>
    </>
  );
};

export const getServerSideProps = requireLogin();

export default Summary;
