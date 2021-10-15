import { Center, Container, Spinner, Stack } from "@chakra-ui/react";
import React from "react";
import { DashboardNavigation } from "../../components/DashboardNavigation";
import DatePicker from "../../components/DatePicker";
import { Navbar } from "../../components/Navbar";
import ResultsTable from "../../components/ResultsTable";
import { useDateFilter } from "../../hooks/useDateFilter";
import { requireLogin } from "../../integrations/authentication";
import Head from 'next/head'

const Results = () => {
  const { data, error, setDateFilter } = useDateFilter();
  if (error) return <div>No Data</div>;

  return (
    <>
      <Head>
        <title>Feedback: Results Table</title>
      </Head>
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
        {data ? 
          <ResultsTable
            maxW="100vw"
            overflowX="auto"
            mt="8"
            feedback={data}
            canFilter
            globalFilter
          /> : 
        <Center h="100vh" w="100vw">
          <Spinner
            thickness="6px"
            speed="0.65s"
            emptyColor="gray.200"
            color="teal.500"
            size="xl"
          />
        </Center>
        }
      </Container>
    </>
  );
};

export const getServerSideProps = requireLogin();

export default Results;
