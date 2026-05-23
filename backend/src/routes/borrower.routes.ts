import express from "express";

import authMiddleware from "../middleware/auth.middleware";

import upload from "../utils/multer";

import {
  createProfile,
  uploadSalarySlip,
} from "../controllers/borrower.controller";

const router = express.Router();

router.post(
  "/profile",
  authMiddleware,
  createProfile
);

router.post(
  "/upload",
  authMiddleware,
  upload.single("salarySlip"),
  uploadSalarySlip
);

export default router;