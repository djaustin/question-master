import React, { useState } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useSWR from "swr";
import fetcher from "../integrations/jsonFetcher";

export type DatePickerProps = {
    setApiUrl: (apiUrl) => void;
  };

export default function DatePicker({
    setApiUrl,
}: DatePickerProps) {
    const [dateRange, setDateRange] = useState<[Date, Date]>([null, null]);
    const [startDate, endDate] = dateRange;

    function onDateChanged(date: [Date, Date]) {
        setDateRange(date);
        if(date[1]){
            const dateRange = [date[0].toISOString(), date[1].toISOString()];
            setApiUrl("/api/date?dateRange=" + dateRange);
        }
  }

  return (
    <ReactDatePicker
        selectsRange={true}
        startDate={startDate}
        endDate={endDate}
        onChange={(date) => onDateChanged(date)}
    />
    )
}

