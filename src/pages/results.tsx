import {
  Box,
  Center,
  Container,
  Flex,
  Heading,
  Spinner,
} from "@chakra-ui/react";
import React from "react";
import useSWR from "swr";
import ResultsTable from "../components/ResultsTable";
import fetcher from "../integrations/jsonFetcher";

const Results = () => {
  const { data, error } = useSWR("/api/feedback", fetcher);

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
      <Container mt={5} maxW="8xl">
        <Box>
          <ResultsTable feedback={data} />
        </Box>
      </Container>
    </>
  );
};

export default Results;