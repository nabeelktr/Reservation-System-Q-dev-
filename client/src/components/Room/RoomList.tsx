"use client"
import React, { useState } from "react";
import RoomCard from "./RoomCard";
import CustomModal from "../../utils/CustomModal";
import BookingForm from "../Booking/BookingForm";
import { Toaster } from "sonner";

type Props = {
  rooms: any;
  selectedDate: any;
  fetchRooms: any;
};

const RoomList = ({ rooms, selectedDate, fetchRooms }: Props) => {
  const [open, setOpen] = useState(false);
  const [room, setRoom] = useState<any>()
  const handleBooking = (room: any) => {
    setOpen(true)
    setRoom(room)
  }
  return (
    <div className="flex flex-col gap-2">
      <Toaster position="top-right" />
      {rooms.map((room: any, index: number) => (
        <div key={index} onClick={() => handleBooking(room)}>
        <RoomCard room={room} />
        </div>
      ))}

      {open && room && (
        <CustomModal open={open} setOpen={setOpen} component={BookingForm} roomNumber={ room.number } date={selectedDate} fetchRooms={fetchRooms} />
      )}
    </div>
  );
};

export default RoomList;
