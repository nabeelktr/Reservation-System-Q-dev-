import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { BookingSchema } from "../../utils/yupSchemas";
import { styles } from "../../styles/style";
import { useBookRoomMutation } from "../../../redux/features/apiSlice";
import { toast } from "sonner";

type FormData = {
  employeeName: string;
  employeeId: string;
};

type Props = {
  setOpen: (open: any) => void;
  date: any;
  roomNumber: any;
  fetchRooms: any
};

const BookingForm: React.FC<Props> = ({ setOpen, date, roomNumber, fetchRooms }) => {
    const [bookRoom, {isLoading, isSuccess}] = useBookRoomMutation()
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(BookingSchema),
  });

  const onSubmit = async (data: FormData) => {
    try{
        await bookRoom({roomNumber, data, date})
    }catch{
        toast.error("error booking room")
    }
  };

  useEffect(() => {
    if(isSuccess){
        toast.success("Room booked Successfully")
        setOpen(false)
        fetchRooms(date)
    }
  }, [isSuccess])

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-6 flex flex-col gap-3">
      <p className="text-sm uppercase font-semibold ">
        Room No:<span className="font-normal pl-2">{roomNumber}</span>
      </p>
      <p className="text-sm uppercase font-semibold pb-4">
        Date:<span className="font-normal pl-2">{date}</span>{" "}
      </p>

      <div>
        <label className={`${styles.label}`}>Employee Name:</label>
        <Controller
          name="employeeName"
          control={control}
          defaultValue="" 
          render={({ field }) => (
            <input type="text" {...field} className={`${styles.input}`} />
          )}
        />
        <p className="text-xs text-red-400 pt-1">
          {errors.employeeName?.message}
        </p>
      </div>

      <div>
        <label className={`${styles.label}`}>Employee ID:</label>
        <Controller
          name="employeeId"
          defaultValue="" 
          control={control}
          render={({ field }) => (
            <input type="text" {...field} className={`${styles.input}`} />
          )}
        />
        <p className="text-xs text-red-400 pt-1">
          {errors.employeeId?.message}
        </p>
      </div>

      <button type="submit" className={`${styles.button} text-white mt-4`}>
        Confirm Booking
      </button>
    </form>
  );
};

export default BookingForm;
