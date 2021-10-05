import React, { useState } from "react";
import ReactDatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import useSWR from "swr";
import fetcher from "../integrations/jsonFetcher";

export type DatePickerProps = {
    setFeedbackData: (dateRange) => void;
  };

export default function DatePicker({
    setFeedbackData
}: DatePickerProps) {
    const [dateRange, setDateRange] = useState<[Date, Date]>([null, null]);
    const [startDate, endDate] = dateRange;

    function onDateChanged(date) {
      setDateRange(date);
      const { data, error } = useSWR(["/api/date", dateRange], fetcher);
      if(data){
          setFeedbackData(data);
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

