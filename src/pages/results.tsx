import useSWR from "swr";
import { Text } from "@chakra-ui/react";
import ResultsTable from "../components/ResultsTable";

const Results = () => {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data } = useSWR("/api/feedback", fetcher);
  console.log(data);
  if (data) return <ResultsTable feedback={data} />;
  return <Text>No data</Text>;
};

export default Results;
