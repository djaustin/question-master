import { useState } from "react";
import useSWR from "swr";
import { DateRange } from "../components/DatePicker";
import fetcher from "../integrations/jsonFetcher";

export const useDateFilter = (baseUrl: string = "/api/feedback") => {
  const [apiUrl, setApiUrl] = useState(baseUrl);
  const { data, error } = useSWR(apiUrl, fetcher);

  const setDateFilter = (range: DateRange) => {
    if (!range) return setApiUrl(baseUrl);
    const isoRange = range.map((date) => date?.toISOString());
    setApiUrl(`${baseUrl}?dateRange=${isoRange.join(",")}`);
  };

  return { setDateFilter, data, error };
};
