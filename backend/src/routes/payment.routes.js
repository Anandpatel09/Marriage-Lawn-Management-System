// src/routes/payment.routes.js

import express from "express";

import {
  createPaymentOrder,
  verifyPayment,
  markPaymentFailure,
} from "../controllers/payment.controller.js";

import { authenticate } from "../middlewares/auth.middlewae.js";

const router = express.Router();

// Create an online payment order and pending booking.
router.post("/create-order", authenticate, createPaymentOrder);

// Verify Razorpay payment after Checkout succeeds.
router.post("/verify", authenticate, verifyPayment);

// Record a failed or dismissed payment attempt.
router.post("/failure", authenticate, markPaymentFailure);

export default router;