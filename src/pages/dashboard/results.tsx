import { Container, Stack } from "@chakra-ui/react";
import React, { useState } from "react";
import { DashboardNavigation } from "../../components/DashboardNavigation";
import DatePicker from "../../components/DatePicker";
import { Navbar } from "../../components/Navbar";
import ResultsTable from "../../components/ResultsTable";
import { requireLogin } from "../../integrations/authentication";
import Head from 'next/head'
import { get24HrsAgoDateParam } from "../../hooks/useDateFilter";

const Results = () => {
  const dateRangeParam = get24HrsAgoDateParam();
  const [dateRange, setDateRange ] = useState(dateRangeParam);

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
          <DatePicker setDateRangeExternal={setDateRange} />
          <DashboardNavigation />
        </Stack>
        <ResultsTable
          maxW="100vw"
          overflowX="auto"
          mt="8"
          canFilter
          globalFilter
          dateRange={dateRange}
        /> 
      </Container>
    </>
  );
};

export const getServerSideProps = requireLogin();

export default Results;
