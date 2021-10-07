import {
  Center,
  Container,
  Flex,
  Heading,
  Skeleton,
  SkeletonCircle,
  Spinner,
} from "@chakra-ui/react";
import { Feedback } from "@prisma/client";
import React, { useState } from "react";
import useSWR from "swr";
import DatePicker, { DateRange } from "../components/DatePicker";
import FeedbackPieChart from "../components/FeedbackPieChart";
import ResultsTable from "../components/ResultsTable";
import fetcher from "../integrations/jsonFetcher";

const baseFeedbackUrl = "/api/date";

const Results = () => {
  const [apiUrl, setApiUrl] = useState(baseFeedbackUrl);
  const { data, error } = useSWR(apiUrl, fetcher);

  const setDateFilter = (range: DateRange) => {
    const isoRange = range.map((date) => date.toISOString());
    setApiUrl(`${baseFeedbackUrl}?dateRange=${isoRange.join(",")}`);
  };
  if (error) return <div>No Data</div>;

  return (
    <>
      <Flex bg="teal.500" px={5} py={2} justify="space-between">
        <Heading color="gray.100">Results Page</Heading>
      </Flex>
      <Flex width="20%" alignSelf="right" justify="space-between" mt={5} ml={5}>
        <DatePicker onRangeChange={setDateFilter} />
      </Flex>
      {data ? (
        <>
          <Flex mt={5} mr={5}>
            <Container width="40%">
              <FeedbackPieChart data={data} />
            </Container>
          </Flex>
          <Container mt={5} maxW="8xl">
            <ResultsTable feedback={data} />
          </Container>
        </>
      ) : (
        <>
          <Center mt={5} mr={5}>
            <SkeletonCircle size="sm" />
          </Center>
          <Container mt={5} maxW="8xl">
            <Skeleton h="800px" variant="" />
          </Container>
        </>
      )}
    </>
  );
};

export default Results;
