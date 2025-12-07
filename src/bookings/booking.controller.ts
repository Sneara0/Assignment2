import { Request, Response } from "express";
import { AuthRequest } from "../middleware/auth";
import { createBooking, getBookings, updateBooking } from "./booking.service";

export const addBooking = async (req: AuthRequest, res: Response) => {
  try {
    const customer_id = req.user.id; 
    const bookingData = req.body;
    const booking = await createBooking({ ...bookingData, customer_id });
    res.status(201).json({ success: true, data: booking });
  } catch (err: any) {
    console.error(err);
    res.status(400).json({ success: false, message: err.message });
  }
};


export const listBookings = async (req: AuthRequest, res: Response) => {
  try {
    const bookings = await getBookings(req.user);
    res.json({ success: true, data: bookings });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const modifyBooking = async (req: AuthRequest, res: Response) => {
  try {
    const { bookingId } = req.params;
    const data = req.body;
    const booking = await updateBooking(Number(bookingId), data, req.user);
    res.json({ success: true, data: booking });
  } catch (err: any) {
    console.error(err);
    res.status(400).json({ success: false, message: err.message });
  }
};
