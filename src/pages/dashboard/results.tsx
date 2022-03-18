import { Container, Stack } from "@chakra-ui/react";
import Head from "next/head";
import React from "react";
import { DashboardNavigation } from "../../components/DashboardNavigation";
import DatePicker from "../../components/DatePicker";
import { Navbar } from "../../components/Navbar";
import ResultsTable from "../../components/ResultsTable";
import { useDateFilter } from "../../hooks/useDateFilter";
import { requireLogin } from "../../integrations/authentication";

const Results = () => {
  const { feedbackData, setDateFilter } = useDateFilter();

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
        <ResultsTable
          maxW="100vw"
          overflowX="auto"
          mt="8"
          canFilter
          globalFilter
          data={feedbackData || []}
        />
      </Container>
    </>
  );
};

export const getServerSideProps = requireLogin();

export default Results;
