"use client"
import React, { useState } from "react";
import DatePicker from "../DatePicker/DatePicker";
import { Toaster, toast } from "sonner";
import dateValidationSchema from "../../utils/yupSchemas";


type Props = {
  fetchRooms: (value: Date | null) => void;
};

const Banner: React.FC<Props> = ({fetchRooms}) => {
  const [value, setValue] = useState({
    startDate: null,
    endDate: null
  });
  const [shake, setShake] = useState(false);

  const search = async () => {

    try {
      await dateValidationSchema.validate({ date: value.startDate });
      fetchRooms(value.startDate);
    } catch (validationError: any) {
      setShake(true)
      setTimeout(() => setShake(false), 300)
      toast.warning(validationError.message);
    }

  };

  return (

    <div className="relative lg:mt-20 bg-blue-900 pb-12">
      <Toaster position="top-right"/>
      <div className="relative grid 1000px:-mt-[6rem] items-end  w-full  md:h-[30vh] h-[20vh] ">
        <div className="absolute left-0   z-[9] text-white w-[80%] ml-[12%]">
          <div className="flex flex-col justify-end items-start  text-[5vw] md:text-[3vw] md:pb-4">
            <span className="font-[1000] 800px:-mb-[20px]">
              Check Room Availability
            </span>
          </div>
          <div className="flex flex-col justify-end items-start text-[3vw] md:text-[1.5vw] ">
            <span className="font-[50] 800px:-mb-[10px]">
              Manage bookings and availability for rooms with flexible date
              options.
            </span>
          </div>
        </div>
      </div>
      <div className="absolute -bottom-7 p-1 h-14 w-[76%] mx-[12%] rounded-md bg-yellow-900 grid grid-cols-10 lg:grid-cols-8 gap-1">
        <div className="col-span-7">
          <DatePicker setValue={setValue}  value={value} />
        </div>
        <div className={`bg-blue-800 rounded-md hover:bg-blue-900 lg:col-span-1 col-span-3 ${shake ? 'shake' : ''}`} onClick={search}>
          <p className="uppercase text-sm font-semibold text-white items-center h-full tracking-wider cursor-pointer flex justify-center"> Search</p>
        </div>
      </div>
    </div>
  );
};

export default Banner;
