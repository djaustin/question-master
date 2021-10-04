import {
  Center,
  Container,
  Flex,
  Heading,
  Spinner,
} from "@chakra-ui/react";
import React, { useState } from "react";
import useSWR from "swr";
import FeedbackPieChart from "../components/FeedbackPieChart";
import ResultsTable from "../components/ResultsTable";
import fetcher from "../integrations/jsonFetcher";
import DatePicker from "../components/DatePicker";
import { useEffect } from "react";
import { Feedback } from "@prisma/client";
import prisma from "../integrations/db";

const Results = () => {
  const { data, error } = useSWR("/api/feedback", fetcher);
  const [feedbackData, setFeedbackData] = useState<Feedback[]>();

  if (error) return <div>No Data</div>;
  if (!data)
    return (
      <Center h="100vh" w="100vw">
        <Spinner
          thickness="6px"
          speed="0.65s"
          emptyColor="gray.200"
          color="teal.500"
          size="xl"
        />
      </Center>
    );

  return (
    <>
      <Flex bg="teal.500" px={5} py={2} justify="space-between">
        <Heading color="gray.100">Results Page</Heading>
      </Flex>
      <Flex width="20%" alignSelf="right" justify="space-between" mt={5} ml={5}>
        <DatePicker setFeedbackData={setFeedbackData}/>
      </Flex>
      <Flex mt={5} mr={5}>
        <Container width="40%">
          <FeedbackPieChart data={data} />
        </Container>
      </Flex>
      <Container mt={5} maxW="8xl">
          <ResultsTable feedback={data} />
      </Container>
    </>
  );
};

export default Results;
