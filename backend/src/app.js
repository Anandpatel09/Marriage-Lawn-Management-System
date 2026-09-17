import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes.js";
import contactRouter from "./routes/contact.routes.js";

dotenv.config();

const app = express();


// ================= CORS =================

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);


// ================= MIDDLEWARE =================

app.use(express.json());
app.use(cookieParser());


// ================= AUTH ROUTES =================

app.use("/api/auth", authRoutes);


// ================= CONTACT ROUTES =================

app.use("/api/contact", contactRouter);


// ================= TEST ROUTE =================

app.get("/", (req, res) => {
  res.json({
    message: "Marriage Lawn Management API is running",
  });
});


export default app;