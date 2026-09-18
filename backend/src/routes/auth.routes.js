import express from "express";

import {
    register,
    login,
    logout,
    forgotPassword,
    resetPassword,
    getMe,
    refreshAccessToken,
} from "../controllers/auth.controller.js";

import { authenticate } from "../middlewares/auth.middlewae.js";

const router = express.Router();


// ================= AUTH =================

router.post("/register", register);

router.post("/login", login);

router.post("/logout", logout);

router.post("/forgot-password", forgotPassword);

router.post("/reset-password", resetPassword);

router.post("/refresh-token", refreshAccessToken);


// ================= CURRENT USER =================

router.get("/me", authenticate, getMe);


export default router;