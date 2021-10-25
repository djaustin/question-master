import { Container, Stack, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { DashboardNavigation } from "../../components/DashboardNavigation";
import DatePicker from "../../components/DatePicker";
import { Navbar } from "../../components/Navbar";
import { ResultSummary } from "../../components/ResultSummary";
import { useDateFilter } from "../../hooks/useDateFilter";
import { requireLogin } from "../../integrations/authentication";
import Head from 'next/head'
import dayjs from "dayjs";

export const Summary = () => {
  const { feedbackData, setDateFilter, error } = useDateFilter();
  const date24HrsAgo: Date = dayjs().subtract(1, 'day').toDate();
  const isoRange = [date24HrsAgo, new Date()].map((date) => date?.toISOString());
  const dateRangeParam = `dateRange=${isoRange.join(",")}`;

  const [dateRange, setDateRange ] = useState(dateRangeParam);

  if (error) return "error";
  return (
    <>
      <Head>
        <title>Feedback: Summary</title>
      </Head>
      <Navbar />
      <Container mt="8" maxW="container.xl">
        <Stack
          direction={{ base: "column", md: "row" }}
          justify="space-between"
          align="center"
        >
          <DatePicker onRangeChange={setDateFilter} setDateRangeExternal={setDateRange}/>
          <DashboardNavigation />
        </Stack>
        {feedbackData ? <ResultSummary data={feedbackData} dateRange={dateRange} /> : <Text>Loading...</Text>}
      </Container>
    </>
  );
};

export const getServerSideProps = requireLogin();

export default Summary;
