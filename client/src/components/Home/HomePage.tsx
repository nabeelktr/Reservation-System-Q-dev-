"use client";
import React, { useEffect, useState } from "react";
import Banner from "./Banner";
import RoomList from "../Room/RoomList";
import { useGetAvailableRoomsMutation } from "../../../redux/features/apiSlice";
import { Toaster, toast } from "sonner";
import Loader from "../Loader";

type Props = {};

function Home({}: Props) {
  const [rooms, setRooms] = useState<any>([]);
  const [selectedDate, setSelectedDate] = useState<any>();
  const [getAvailableRooms, { isLoading, error }] =
    useGetAvailableRoomsMutation();

  const fetchRooms = async (value: Date | null) => {
    setSelectedDate(value)
    const { data } = await getAvailableRooms({ value });
    setRooms(data);
  };

  return (
    <div className="gap-12 md:gap-14 flex flex-col">
      <Banner fetchRooms={fetchRooms} />
      {isLoading ? <Loader /> : rooms && <RoomList rooms={rooms} selectedDate={selectedDate} fetchRooms={fetchRooms} />}
      <Toaster position="top-right" />
    </div>
  );
}

export default Home;
