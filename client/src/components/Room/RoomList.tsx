import React from "react";
import RoomCard from "./RoomCard";

type Props = {
  rooms: any;
};

const RoomList = ({rooms}: Props) => {
  return (
    <div className="flex flex-col gap-2">
      {rooms.map((room: any, index: number) => (
        <RoomCard key={index} room={room} />
      ))}
    </div>
  );
};

export default RoomList;
