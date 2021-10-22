import { useColorModeValue } from "@chakra-ui/color-mode";
import { toVarDefinition } from "@chakra-ui/styled-system";
import dayjs from "dayjs";
import React, { useState } from "react";
import ReactDatePicker from "react-datepicker";

export type DateRange = [Date, Date];

export type DatePickerProps = {
  onRangeChange: (range: DateRange) => void;
  setDateRangeExternal: (range: string) => void;
};

export default function DatePicker({ onRangeChange, setDateRangeExternal }: DatePickerProps) {
  const date24HrsAgo: Date = dayjs().subtract(1, 'day').toDate();
  const [dateRange, setDateRange] = useState<DateRange>([date24HrsAgo, null]);
  const [startDate, endDate] = dateRange;
  onRangeChange(dateRange);

  function onDateChanged(range: DateRange) {
    const fromDate = range[0] && dayjs(range[0]).startOf("day").toDate();
    const toDate = range[1] && dayjs(range[1]).endOf("day").toDate();

    setDateRange([fromDate, toDate]);
    if (!(fromDate || toDate)) onRangeChange(null);
    if (toDate) {
      onRangeChange?.([fromDate, toDate]);
      const dateRangeParam = `dateRange=${[fromDate, toDate].join(",")}`;
      setDateRangeExternal(dateRangeParam);
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
        name="datepicker-input"
      />
    </div>
  );
}
