import { Box, Modal } from "@mui/material";
import React from "react";

type Props = {
  roomNumber: any;
  date: string | any;
  open: boolean;
  setOpen: (open: boolean) => void;
  component: any;
  fetchRooms: any
};

const CustomModal: React.FC<Props> = ({
  open,
  setOpen,
  component: Component,
  roomNumber,
  date,
  fetchRooms
}) => {
  return (
    <div>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="dark:bg-slate-900 absolute left-[50%] top-[50%] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-[8px] bg-white p-4 shadow outline-none dark:bg-opacity-50 dark:bg-gradient-to-b dark:from-gray-900 dark:to-black">
        <Component setOpen={setOpen} date={date} roomNumber={roomNumber} fetchRooms={fetchRooms}/>
        </Box>
      </Modal>
    </div>
  );
};

export default CustomModal;
