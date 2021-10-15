import { useColorModeValue } from "@chakra-ui/color-mode";
import dayjs from "dayjs";
import React, { useState } from "react";
import ReactDatePicker from "react-datepicker";

export type DateRange = [Date, Date];

export type DatePickerProps = {
  onRangeChange: (range: DateRange) => void;
};

export default function DatePicker({ onRangeChange }: DatePickerProps) {
  const date24HrsAgo: Date = new Date(new Date().getTime() - (24 * 60 * 60 * 1000));
  const sessionStorageStartDate = sessionStorage.getItem('StartDate') && new Date(sessionStorage.getItem('StartDate'));
  const sessionStorageEndDate = sessionStorage.getItem('EndDate') && new Date(sessionStorage.getItem('EndDate'));
  const [dateRange, setDateRange] = useState<DateRange>([sessionStorageStartDate || date24HrsAgo, sessionStorageEndDate || new Date()]);
  const [startDate, endDate] = dateRange;
  onRangeChange(dateRange);

  function onDateChanged(range: DateRange) {
    const fromDate = range[0] && dayjs(range[0]).startOf("day").toDate();
    const toDate = range[1] && dayjs(range[1]).endOf("day").toDate();

    setDateRange([fromDate, toDate]);
    if (!(fromDate || toDate)) onRangeChange(null);
    if (toDate) {
      onRangeChange?.([fromDate, toDate]);
    }
  }

  return (
    <div className={useColorModeValue("light-theme", "dark-theme")}>
      <ReactDatePicker
        isClearable
        selectsRange={true}
        startDate={startDate}
        endDate={endDate}
        onChange={(date) => onDateChanged(date as DateRange)}
      />
    </div>
  );
}
