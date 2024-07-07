"use client";
import React, { useEffect, useState } from "react";
import {
  useCancelBookingMutation,
  useGetBookingsQuery,
} from "../../../redux/features/apiSlice";
import Loader from "../../components/Loader";
import Heading from "../../utils/Heading";
import Header from "../../components/Header";
import BasicTable from "../../utils/BasicTable";
import SubLoader from "../../components/SubLoader";
import { XCircleIcon } from "@heroicons/react/24/outline";
import CustomDeleteModal from "../../utils/CustomDeleteModal";
import { Toaster, toast } from "sonner";

type Props = {};

const page = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [booking, setBooking] = useState<any>();
  const {
    data: bookings,
    error,
    isLoading: getBookingsLoad,
    refetch,
  } = useGetBookingsQuery({});
  const [cancelBooking, { isLoading, isSuccess }] = useCancelBookingMutation();

  const handelCancelBooking = async () => {
    try {
      await cancelBooking(booking);
    } catch {
      console.log(booking);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Booking cancelled successfully");
      setOpen(false);
      refetch();
    }
  }, [isSuccess]);

  useEffect(() => {
    refetch();
  }, []);

  const columns = [
    {
      header: "Room Number",
      accessorKey: "roomNumber",
    },
    {
      header: "Employee Name",
      accessorKey: "employeeName",
    },
    {
      header: "Id",
      accessorKey: "employeeId",
    },
    {
      header: "date",
      accessorKey: "date",
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (info: any) => {
        const current = info.getValue();
        return (
          <p
            className={`${
              current === "success" ? "text-green-800" : "text-yellow-800"
            } cursor-pointer uppercase text-xs`}
          >
            {current}
          </p>
        );
      },
    },
    {
      header: "Action",
      cell: (info: any) => {
        const today = new Date().toISOString().split("T")[0];
        const originalDate = new Date(info.row.original.date)
          .toISOString()
          .split("T")[0];
        if (isLoading) {
          return (
            <span>
              <SubLoader />
            </span>
          );
        }
        if (info.row.original.status === "success" && today === originalDate) {
          return (
            <div
              className="flex items-center gap-1 text-red-300 cursor-pointer"
              onClick={() => {
                setBooking(info.row.original);
                setOpen(true);
              }}
            >
              <XCircleIcon className="cursor-pointer h-6" />
              Cancel
            </div>
          );
        }
        return null;
      },
    },
  ];
  return (
    <div className="pb-20">
      <Toaster position="top-right" />
      <Heading
        description="A comprehensive system for managing hotel room bookings and guest services"
        keywords="Hotel,Room Management,Bookings,Guest Services"
        title="Bookings"
      />
      <div className="fixed w-full z-[99]">
        <Header activeItem={1} />
      </div>

      <div className="h-32"></div>
      {bookings && (
        <div
          className={`bg-white dark:bg-gray-800  shadow-md sm:rounded-sm overflow-hidden mx-2 md:mx-28 p-4 z-[10] `}
        >
          {getBookingsLoad ? (
            <Loader />
          ) : (
            <BasicTable datas={bookings} columns={columns} type="category" />
          )}
        </div>
      )}
      {open && (
        <CustomDeleteModal
          open={open}
          setOpen={setOpen}
          handleFunction={handelCancelBooking}
          text="Are you sure you want to cancel this booking?"
        />
      )}
    </div>
  );
};

export default page;
