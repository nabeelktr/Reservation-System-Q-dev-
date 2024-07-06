"use client";
import React, { useEffect, useState } from "react";
import Banner from "./Banner";
import RoomList from "../Room/RoomList";
import { useGetAvailableRoomsMutation } from "../../../redux/features/apiSlice";
import { Toaster, toast } from "sonner";

type Props = {};

function Home({}: Props) {
  const [rooms, setRooms] = useState<any>([]);
  const [getAvailableRooms, { isLoading, error }] =
    useGetAvailableRoomsMutation();
  const fetchRooms = async (value: Date | null) => {
    const {data} = await getAvailableRooms({ value });
    setRooms(data);
  };

  return (
    <div className="gap-12 md:gap-14 flex flex-col">
      <Banner fetchRooms={fetchRooms} />
      <RoomList rooms={rooms} />
      <Toaster position="top-right" />
    </div>
  );
}

export default Home;
