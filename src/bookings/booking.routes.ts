import { Router } from "express";
import { authGuard } from "../middleware/auth";
import { addBooking, listBookings, modifyBooking } from "./booking.controller";

const router = Router();


router.post("/", authGuard, addBooking);


router.get("/", authGuard, listBookings);


router.put("/:bookingId", authGuard, modifyBooking);

export const bookingVehicle= router;
