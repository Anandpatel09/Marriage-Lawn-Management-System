import express from "express";
import {
  createBooking,
  getMyBookings,
} from "../controllers/booking.controller.js";
import { authenticate } from "../middlewares/auth.middlewae.js";

const router = express.Router();

router.post("/", authenticate, createBooking);
router.get("/my-bookings", authenticate, getMyBookings);

export default router;