import {
  Button,
  Center,
  Container,
  Flex,
  Heading,
  Skeleton,
  SkeletonCircle,
  useColorMode,
} from "@chakra-ui/react";
import { signOut } from "next-auth/client";
import { default as React, useState } from "react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import useSWR from "swr";
import DatePicker, { DateRange } from "../components/DatePicker";
import FeedbackPieChart from "../components/FeedbackPieChart";
import ResultsTable from "../components/ResultsTable";
import { requireLogin } from "../integrations/authentication";
import fetcher from "../integrations/jsonFetcher";

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

  return (
    <>
      <Flex bg="teal.500" px={5} py={2} justify="space-between">
        <Heading color="gray.100">Results Page</Heading>
        <Button variant="solid" color="white" onClick={() => signOut()}>
          Sign out
        </Button>
      </Flex>
      {data ? (
        <>
          <Flex
            width={{ base: "full", md: "400px" }}
            alignSelf="right"
            justify="space-between"
            px="4"
            py="4"
          >
            <DatePicker onRangeChange={setDateFilter} />
          </Flex>
          <Flex mt={5} mr={5}>
            <Container width="40%">
              <FeedbackPieChart data={data} />
            </Container>
          </Flex>
          <Container mt={5} maxW="8xl">
            <ResultsTable feedback={data} />
          </Container>
        </>
      ) : (
        <>
          <Center mt={5} mr={5}>
            <SkeletonCircle size="sm" />
          </Center>
          <Container mt={5} maxW="8xl">
            <Skeleton h="800px" variant="" />
          </Container>
        </>
      )}
    </>
  );
};

export const getServerSideProps = requireLogin();

export default Results;
