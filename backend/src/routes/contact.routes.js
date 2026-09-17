import express from "express";

import { getAllEnquiries, sendEnquiry } from "../controllers/contact.controller.js";

const router = express.Router();

router.post("/enquiry", sendEnquiry);
router.get("/enquiries", getAllEnquiries);

export default router;