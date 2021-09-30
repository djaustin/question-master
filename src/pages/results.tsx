import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  Heading,
  Spinner,
} from "@chakra-ui/react";
import { signOut } from "next-auth/client";
import React from "react";
import useSWR from "swr";
import FeedbackPieChart from "../components/FeedbackPieChart";
import ResultsTable from "../components/ResultsTable";
import { requireLogin } from "../integrations/authentication";
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
        <Button variant="solid" color="white" onClick={() => signOut()}>
          Sign out
        </Button>
      </Flex>
      <Container mt={5} maxW="8xl">
        <Center mb="1">
          <Box w="400px">
            <FeedbackPieChart data={data} />
          </Box>
        </Center>
        <ResultsTable feedback={data} />
      </Container>
    </>
  );
};

export const getServerSideProps = requireLogin();

export default Results;
