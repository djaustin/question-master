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
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

const Results = () => {
  const { data, error } = useSWR("/api/feedback", fetcher);
  const [ranges, setRanges] = useState([
    {
      startDate: null,
      endDate: null,
      key: "rollup"
    }
  ]);

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
      <Container mt={5} width="40%">
        <FeedbackPieChart data={data} />
      </Container>
      <DateRangePicker
        ranges={ranges}
        onChange={ranges => setRanges([ranges.rollup])}
        />
      <Container mt={5} maxW="8xl">
          <ResultsTable feedback={data} />
      </Container>
    </>
  );
};

export default Results;
