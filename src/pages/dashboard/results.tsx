import {
  Center,
  Container,
  HStack,
  Input,
  Spinner,
  Stack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import useSWR from "swr";
import { DashboardNavigation } from "../../components/DashboardNavigation";
import DatePicker, { DateRange } from "../../components/DatePicker";
import { Navbar } from "../../components/Navbar";
import ResultsTable from "../../components/ResultsTable";
import { requireLogin } from "../../integrations/authentication";
import fetcher from "../../integrations/jsonFetcher";

const baseFeedbackUrl = "/api/feedback";

const Results = () => {
  const [apiUrl, setApiUrl] = useState(baseFeedbackUrl);
  const { data, error } = useSWR(apiUrl, fetcher);

  const setDateFilter = (range: DateRange) => {
    if (!range) return setApiUrl(baseFeedbackUrl);
    const isoRange = range.map((date) => date?.toISOString());
    setApiUrl(`${baseFeedbackUrl}?dateRange=${isoRange.join(",")}`);
  };
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
          <DatePicker onRangeChange={setDateFilter} />
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
