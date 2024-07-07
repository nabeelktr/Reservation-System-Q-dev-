import { NextFunction, Request, Response } from "express";
import fs from "fs";
import path from "path";
import { StatusCode } from "../interfaces/enums";

export default class AdminController {
  rooms: Buffer;
  constructor() {
    const filePath = path.resolve(__dirname, "../db.json");
    const fileContents = fs.readFileSync(filePath, "utf8");
    this.rooms = JSON.parse(fileContents);
  }

  getAvailableRooms = async (req: Request, res: Response) => {
    try {
      const { value: date } = req.body;

      if (!date) {
        return res
          .status(StatusCode.BadRequest)
          .json({ message: "Date is required" });
      }

      const availableRooms = this.rooms.filter((room: any) => {
        return (
          room.status === "available" &&
          (room.bookings.length === 0 ||
            !room.bookings.some(
              (booking: any) =>
                booking.date === date && booking?.status === "success"
            ))
        );
      });

      res.status(StatusCode.OK).json(availableRooms);
    } catch (error: any) {
      res
        .status(StatusCode.InternalServerError)
        .json({ message: "Internal Server Error" });
    }
  };

  bookRoom = async (req: Request, res: Response) => {
    try {
      const { roomNumber, data, date } = req.body;
      if (!roomNumber || !date || !data) {
        return res
          .status(StatusCode.BadRequest)
          .json({ message: "All booking details are required" });
      }
      const room: any = this.rooms.find(
        (room: any) => room.number === roomNumber
      );
      if (!room) {
        return res
          .status(StatusCode.NotFound)
          .json({ message: "Room not found" });
      }
      if (room.status !== "available") {
        return res
          .status(StatusCode.BadRequest)
          .json({ message: "Room is not available" });
      }
      const isRoomBooked = room.bookings.some(
        (booking: any) => booking.date === date && booking?.status === "success"
      );
      if (isRoomBooked) {
        return res
          .status(StatusCode.BadRequest)
          .json({ message: "Room is already booked for the selected date" });
      }
      const newBooking: any = { date, ...data, status: "success" };
      room.bookings.push(newBooking);
      res.status(StatusCode.OK).json({ message: "Room booked successfully" });
    } catch {
      res
        .status(StatusCode.InternalServerError)
        .json({ message: "Internal Server Error" });
    }
  };

  getBookings = async (req: Request, res: Response) => {
    try {
      const allBookings: any[] = [];
      this.rooms.forEach((room: any) => {
        room.bookings.forEach((booking: any) => {
          allBookings.push({
            roomNumber: room.number,
            employeeName: booking.employeeName,
            date: booking.date,
            employeeId: booking.employeeId,
            status: booking.status,
          });
        });
      });
      res.status(StatusCode.OK).json(allBookings);
    } catch (error: any) {
      res
        .status(StatusCode.InternalServerError)
        .json({ message: "Internal Server Error" });
    }
  };

  cancelBooking = async (req: Request, res: Response) => {
    try {
      const data = req.body;
      const room: any = this.rooms.find(
        (room: any) => room.number === data.roomNumber
      );
      room.bookings.forEach((booking: any) => {
        if (
          booking.date === data.date &&
          booking.employeeId === data.employeeId
        ) {
          booking.status = "cancelled";
        }
      });
      res.status(StatusCode.OK).json({ message: "success" });
    } catch (error: any) {
      res
        .status(StatusCode.InternalServerError)
        .json({ message: "Internal Server Error" });
    }
  };

  getActions = async (req: Request, res: Response) => {
    try {
      const allActions: any[] = [];
      this.rooms.forEach((room: any) => {
        allActions.push({
          roomNumber: room.number,
          totalBookings: room?.bookings.length,
          status: room.status,
        });
      });
      res.status(StatusCode.OK).json(allActions);
    } catch (error: any) {
      res
        .status(StatusCode.InternalServerError)
        .json({ message: "Internal Server Error" });
    }
  };

  changeRoomStatus = async (req: Request, res: Response) => {
    try {
      const  {room: roomNumber}  = req.body;
      const room: any = this.rooms.find(
        (room: any) => room.number === roomNumber
      );
      if (room) {
        room.status = room.status === "available" ? "closed" : "available";
      }
      res.status(StatusCode.OK).json({ message: "success" });
    } catch (error: any) {
      console.log(error);
      res
        .status(StatusCode.InternalServerError)
        .json({ message: "Internal Server Error" });
    }
  };
}
