"use client";
import Header from "../../components/Header";
import Loader from "../../components/Loader";
import BasicTable from "../../utils/BasicTable";
import CustomDeleteModal from "../../utils/CustomDeleteModal";
import Heading from "../../utils/Heading";
import React, { useEffect, useState } from "react";
import {
  useChangeRoomStatusMutation,
  useGetActionsQuery,
} from "../../../redux/features/apiSlice";
import { Toaster, toast } from "sonner";

type Props = {};

const Page = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [room, setRoom] = useState<any>();
  const {
    data: actions,
    isLoading: getactionsLoad,
    refetch,
  } = useGetActionsQuery({});
  const [changeStatus, { isLoading, isSuccess }] =
    useChangeRoomStatusMutation();
  const handleRoomStatus = async () => {
    try {
      await changeStatus({ room });
    } catch {
      console.log(room);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Room Status changed successfully");
      setOpen(false);
      refetch();
    }
  }, [isSuccess]);

  const columns = [
    {
      header: "Room Number",
      accessorKey: "roomNumber",
    },
    {
      header: "Total Bookings",
      accessorKey: "totalBookings",
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (info: any) => {
        const current = info.getValue();
        const handleStatusChange = () => {
          setRoom(info.row.original.roomNumber);
          setOpen(true);
        };
        return (
          <select
            value={current}
            onChange={handleStatusChange}
            className={`${
              current === "available" ? "text-green-800" : "text-red-600"
            } cursor-pointer uppercase text-xs`}
          >
            <option>{current == "available" ? "Open" : "Closed"}</option>
            {current === "closed" && (
              <option value="available">Available</option>
            )}
            {current === "available" && <option value="closed">Closed</option>}
          </select>
        );
      },
    },
  ];
  return (
    <div className="pb-20">
      <Toaster position="top-right" />
      <Heading
        description="A comprehensive system for managing hotel room bookings and guest services"
        keywords="Hotel,Room Management,Bookings,Guest Services"
        title="Action"
      />
      <div className="fixed w-full z-[99]">
        <Header activeItem={2} />
      </div>
      <div className="h-32"></div>
      {actions && (
        <div
          className={`bg-white dark:bg-gray-800  shadow-md sm:rounded-sm overflow-hidden mx-2 md:mx-28 p-4 z-[10] `}
        >
          {getactionsLoad ? (
            <Loader />
          ) : (
            <BasicTable datas={actions} columns={columns} type="category" />
          )}
        </div>
      )}
      {open && (
        <CustomDeleteModal
          open={open}
          setOpen={setOpen}
          handleFunction={handleRoomStatus}
          text="Are you sure you want to change this room status?"
        />
      )}
    </div>
  );
};

export default Page;
