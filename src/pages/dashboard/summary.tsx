import { Container, Stack } from "@chakra-ui/react";
import React from "react";
import { DashboardNavigation } from "../../components/DashboardNavigation";
import DatePicker from "../../components/DatePicker";
import { Navbar } from "../../components/Navbar";
import { ResultSummary } from "../../components/ResultSummary";
import { useDateFilter } from "../../hooks/useDateFilter";
import { requireLogin } from "../../integrations/authentication";
import Head from 'next/head'

export const Summary = () => {
  const { data, error, setDateFilter } = useDateFilter();
  if (error) return "error";
  if (!data) return "loading...";
  return (
    <>
      <Head>
        <title>Summary</title>
      </Head>
      <Navbar />
      <Container mt="8" maxW="container.xl">
        <Stack
          direction={{ base: "column", md: "row" }}
          justify="space-between"
          align="center"
        >
          <DatePicker onRangeChange={setDateFilter} />
          <DashboardNavigation />
        </Stack>
        <ResultSummary data={data} />
      </Container>
    </>
  );
};

export const getServerSideProps = requireLogin();

export default Summary;
