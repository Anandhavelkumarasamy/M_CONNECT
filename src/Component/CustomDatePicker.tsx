import React from "react";
import { DatePicker } from "antd";
import moment from "moment"; // Make sure moment is imported
import { Dayjs } from "dayjs";

interface CustomDatePickerProps {
  title?: string;
  onChange: (date: any, dateString: string | string[]) => void;
  value: string | null;
  disabledDate?: (current: Dayjs) => boolean;
  disabledTime?: (current: Dayjs | null) => any;
}

export default function CustomDatePicker({
  title,
  onChange,
  value,
  disabledDate,
  disabledTime,
}: CustomDatePickerProps) {
  return (
    <div>
      <p className="text-start ms-3 mt-2">Select {title} Time :</p>
      <DatePicker
        className="mx-3"
        value={value ? moment(value) : null} // Using moment for value
        showTime
        getPopupContainer={(trigger: HTMLElement) => {
          return trigger.parentNode as HTMLElement;
        }}
        onChange={(date, dateString) => {
          onChange(date, dateString);
        }}
        disabledDate={disabledDate} // Disable dates before Start Date
        disabledTime={disabledTime} // Disable time before Start Date
      />
    </div>
  );
}
