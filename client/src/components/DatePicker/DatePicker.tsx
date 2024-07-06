import React from "react";
import Datepicker from "react-tailwindcss-datepicker";
type Props = {
  setValue: (value: any) => void;
  value: any;
};

const DatePicker = ({ value, setValue }: Props) => {
  const handleValueChange = (newValue: any) => {
    setValue(newValue);
  };

  return (
    <div className="flex items-center h-full bg-white rounded-md">
      <Datepicker
        asSingle={true}
        minDate={new Date()}
        value={value}
        onChange={handleValueChange}
        inputClassName={"text-sm w-full p-2 focus:ring-0 focus:outline-none"}
      />
    </div>
  );
};

export default DatePicker;
