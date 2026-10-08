import express from "express";

import {
    createBooking,
    getMyBookings,
} from "../controllers/booking.controller.js";

import {
    authenticate,
} from "../middlewares/auth.middlewae.js";

const router =
    express.Router();

// CREATE BOOKING
router.post(
    "/",
    authenticate,
    createBooking
);

// MY BOOKINGS
router.get(
    "/my-bookings",
    authenticate,
    getMyBookings
);

export default router;