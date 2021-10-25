import { Container, Stack } from "@chakra-ui/react";
import React, { useState } from "react";
import { DashboardNavigation } from "../../components/DashboardNavigation";
import DatePicker from "../../components/DatePicker";
import { Navbar } from "../../components/Navbar";
import ResultsTable from "../../components/ResultsTable";
import { useDateFilter } from "../../hooks/useDateFilter";
import { requireLogin } from "../../integrations/authentication";
import Head from 'next/head'
import dayjs from "dayjs";

const Results = () => {
  const date24HrsAgo: Date = dayjs().subtract(1, 'day').toDate();
  const isoRange = [date24HrsAgo, new Date()].map((date) => date?.toISOString());
  const dateRangeParam = `dateRange=${isoRange.join(",")}`;

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
