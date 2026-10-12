// src/controllers/payment.controller.js

import crypto from "node:crypto";
import Razorpay from "razorpay";
import pool from "../config/db.js";
import {
  getBookingData,
  insertBooking,
} from "./booking.controller.js";

const keyId = process.env.RAZORPAY_KEY_ID;
const keySecret = process.env.RAZORPAY_KEY_SECRET;

if (!keyId || !keySecret) {
  console.warn(
    "Razorpay keys are missing. Configure RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in your backend .env file."
  );
}

const razorpay = new Razorpay({
  key_id: keyId || "",
  key_secret: keySecret || "",
});

const requireRazorpayConfig = () => {
  if (!keyId || !keySecret) {
    const error = new Error("Razorpay is not configured on the server.");
    error.statusCode = 500;
    throw error;
  }
};

const safeCompareHex = (expectedHex, receivedHex) => {
  if (
    typeof receivedHex !== "string" ||
    !/^[a-f0-9]{64}$/i.test(receivedHex) ||
    !/^[a-f0-9]{64}$/i.test(expectedHex)
  ) {
    return false;
  }

  const expected = Buffer.from(expectedHex, "hex");
  const received = Buffer.from(receivedHex, "hex");

  return (
    expected.length === received.length &&
    crypto.timingSafeEqual(expected, received)
  );
};

/**
 * POST /api/payments/create-order
 * Creates a pending booking and its Razorpay order.
 */
export const createPaymentOrder = async (req, res) => {
  let connection;

  try {
    requireRazorpayConfig();

    connection = await pool.getConnection();
    await connection.beginTransaction();

    const booking = await getBookingData(
      connection,
      req.body,
      req.user.userId
    );

    const bookingIdForReceipt = `booking_${Date.now()}`;

    const order = await razorpay.orders.create({
      amount: Math.round(booking.totalAmount * 100),
      currency: "INR",
      receipt: bookingIdForReceipt,
      notes: {
        userId: String(req.user.userId),
        venueId: String(booking.venueId),
        packageId: String(booking.packageId),
      },
    });

    const bookingId = await insertBooking(connection, booking, {
      paymentMethod: "online",
      paymentStatus: "initiated",
      razorpayOrderId: order.id,
    });

    await connection.commit();

    return res.status(201).json({
      message: "Payment order created successfully.",
      bookingId,
      razorpayOrderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId,
      status: "pending",
      paymentMethod: "online",
      paymentStatus: "initiated",
    });
  } catch (error) {
    if (connection) {
      await connection.rollback();
    }

    console.error("createPaymentOrder error:", error);

    return res.status(error.statusCode || 500).json({
      message: error.message || "Unable to create payment order.",
    });
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

/**
 * POST /api/payments/verify
 * Verifies the checkout signature and confirms the payment with Razorpay.
 * A booking remains pending until the admin approves it.
 */
export const verifyPayment = async (req, res) => {
  let connection;

  try {
    requireRazorpayConfig();

    const {
      bookingId,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    if (
      !bookingId ||
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature
    ) {
      return res.status(400).json({
        message: "Missing required payment verification fields.",
      });
    }

    const expectedSignature = crypto
      .createHmac("sha256", keySecret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (!safeCompareHex(expectedSignature, razorpay_signature)) {
      return res.status(400).json({
        message: "Invalid Razorpay payment signature.",
      });
    }

    connection = await pool.getConnection();
    await connection.beginTransaction();

    const [bookings] = await connection.execute(
      `SELECT
        id,
        user_id,
        total_amount,
        payment_method,
        payment_status,
        razorpay_order_id
      FROM bookings
      WHERE id = ? AND user_id = ?
      FOR UPDATE`,
      [bookingId, req.user.userId]
    );

    if (!bookings.length) {
      await connection.rollback();

      return res.status(404).json({
        message: "Booking not found.",
      });
    }

    const booking = bookings[0];

    if (booking.razorpay_order_id !== razorpay_order_id) {
      await connection.rollback();

      return res.status(400).json({
        message: "Payment order does not match this booking.",
      });
    }

    if (booking.payment_status === "paid") {
      await connection.rollback();

      return res.status(200).json({
        message: "Payment has already been verified.",
        bookingId: booking.id,
        paymentStatus: "paid",
        status: "pending",
      });
    }

    if (
      booking.payment_method !== "online" ||
      booking.payment_status !== "initiated"
    ) {
      await connection.rollback();

      return res.status(400).json({
        message: "This booking is not awaiting an online payment.",
      });
    }

    // Confirm the payment directly with Razorpay; don't trust the browser alone.
    const payment = await razorpay.payments.fetch(razorpay_payment_id);

    if (
      payment.order_id !== razorpay_order_id ||
      Number(payment.amount) !==
        Math.round(Number(booking.total_amount) * 100) ||
      payment.currency !== "INR" ||
      payment.status !== "captured"
    ) {
      await connection.rollback();

      return res.status(400).json({
        message:
          "Payment has not been captured or the payment details do not match.",
      });
    }

    const [result] = await connection.execute(
      `UPDATE bookings
       SET
         payment_status = 'paid',
         payment_method = 'online',
         paid_amount = total_amount,
         razorpay_payment_id = ?,
         razorpay_signature = ?,
         updated_at = CURRENT_TIMESTAMP
       WHERE id = ? AND user_id = ?
         AND payment_status = 'initiated'`,
      [
        razorpay_payment_id,
        razorpay_signature,
        bookingId,
        req.user.userId,
      ]
    );

    if (result.affectedRows !== 1) {
      await connection.rollback();

      return res.status(409).json({
        message: "Booking payment status changed. Please refresh and check.",
      });
    }

    await connection.commit();

    return res.status(200).json({
      message: "Payment verified successfully.",
      bookingId: Number(bookingId),
      paymentMethod: "online",
      paymentStatus: "paid",
      paidAmount: Number(booking.total_amount),
      status: "pending",
    });
  } catch (error) {
    if (connection) {
      await connection.rollback();
    }

    console.error("verifyPayment error:", error);

    return res.status(error.statusCode || 500).json({
      message: error.message || "Payment verification failed.",
    });
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

/**
 * POST /api/payments/failure
 * Marks an initiated online payment as failed.
 * The booking remains pending and will still need a deliberate retry/cancellation
 * policy if you want to release the date automatically.
 */
export const markPaymentFailure = async (req, res) => {
  try {
    const { bookingId } = req.body;

    if (!bookingId) {
      return res.status(400).json({
        message: "bookingId is required.",
      });
    }

    const [result] = await pool.execute(
      `UPDATE bookings
       SET payment_status = 'failed',
           updated_at = CURRENT_TIMESTAMP
       WHERE id = ?
         AND user_id = ?
         AND payment_method = 'online'
         AND payment_status = 'initiated'`,
      [bookingId, req.user.userId]
    );

    if (result.affectedRows === 0) {
      return res.status(200).json({
        message:
          "No initiated payment was changed. It may already be paid or updated.",
      });
    }

    return res.status(200).json({
      message: "Payment failure recorded.",
      bookingId: Number(bookingId),
      paymentStatus: "failed",
      status: "pending",
    });
  } catch (error) {
    console.error("markPaymentFailure error:", error);

    return res.status(500).json({
      message: "Unable to record payment failure.",
    });
  }
};