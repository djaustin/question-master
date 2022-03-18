import { Feedback } from ".prisma/client";
import dayjs from "dayjs";
import { useState } from "react";
import useSWR from "swr";
import { DateRange } from "../components/DatePicker";
import fetcher from "../integrations/jsonFetcher";

export const useDateFilter = (
  interval?: number,
  baseUrl: string = "/api/feedback"
) => {
  const [apiUrl, setApiUrl] = useState(baseUrl);
  const { data, error } = useSWR(apiUrl, fetcher, {
    refreshInterval: interval || 0,
  });
  let feedbackData: Feedback[];

  if (data) {
    feedbackData = data.feedbackResults;
  }

  const setDateFilter = (range: DateRange) => {
    if (!range) return setApiUrl(baseUrl);
    if (range[1]) {
      const isoRange = range.map((date) => date?.toISOString());
      setApiUrl(`${baseUrl}/?dateRange=${isoRange.join(",")}`);
    }
  };

  return { setDateFilter, feedbackData, error };
};

export function get24HrsAgoDateParam() {
  const date24HrsAgo: Date = dayjs().subtract(1, "day").toDate();
  const isoRange = [date24HrsAgo, new Date()].map((date) =>
    date?.toISOString()
  );
  const dateRangeParam = `dateRange=${isoRange.join(",")}`;
  return dateRangeParam;
}
