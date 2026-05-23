import express from "express";

import authMiddleware from "../middleware/auth.middleware";

import {
  applyLoan,
  getMyLoans,
} from "../controllers/loan.controller";

const router = express.Router();

router.post(
  "/apply",
  authMiddleware,
  applyLoan
);

router.get(
  "/my-loans",
  authMiddleware,
  getMyLoans
);

export default router;