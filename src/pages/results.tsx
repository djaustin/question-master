import { Box, Container, Flex, Heading, Spinner } from "@chakra-ui/react";
import React from "react";
import useSWR from "swr";
import ResultsTable from "../components/ResultsTable";

const Results = () => {
  const fetcher = (...args: any) => fetch(...args).then((res) => res.json());
  const { data, error } = useSWR("/api/feedback", fetcher);

  if (error) return <div>No Data</div>;
  if (!data) return <Spinner />;

  return (
    <>
      <Flex bg="teal.500" px={5} py={2} justify="space-between">
        <Heading color="gray.100">Results Page</Heading>
      </Flex>
      <Container mt={5} maxW="8xl">
        <Box h="1000px" overflow="auto">
          <ResultsTable feedback={data} />
        </Box>
      </Container>
    </>
  );
};

export default Results;
