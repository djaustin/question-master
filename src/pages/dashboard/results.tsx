import {
  Center,
  Container,
  HStack,
  Input,
  Spinner,
  Stack,
} from "@chakra-ui/react";
import React from "react";
import useSWR from "swr";
import { DashboardNavigation } from "../../components/DashboardNavigation";
import DatePicker from "../../components/DatePicker";
import { Navbar } from "../../components/Navbar";
import ResultsTable from "../../components/ResultsTable";
import { requireLogin } from "../../integrations/authentication";
import fetcher from "../../integrations/jsonFetcher";

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
      <Navbar />
      <Container mt="8" maxW="container.xl">
        <Stack
          direction={{ base: "column", md: "row" }}
          align="center"
          justify="space-between"
        >
          <DatePicker onRangeChange={(range) => console.log(range)} />
          <DashboardNavigation />
        </Stack>
        <ResultsTable
          maxW="100vw"
          overflowX="auto"
          mt="8"
          feedback={data}
          canFilter
          globalFilter
        />
      </Container>
    </>
  );
};

export const getServerSideProps = requireLogin();

export default Results;
