import express from "express";

import authMiddleware from "../middleware/auth.middleware";

import authorizeRoles from "../middleware/role.middleware";

import {
  getAppliedLoans,
  approveLoan,
  rejectLoan,
} from "../controllers/sanction.controller";

const router = express.Router();

router.get(
  "/loans",
  authMiddleware,
  authorizeRoles("SANCTION", "ADMIN"),
  getAppliedLoans
);

router.patch(
  "/:id/approve",
  authMiddleware,
  authorizeRoles("SANCTION", "ADMIN"),
  approveLoan
);

router.patch(
  "/:id/reject",
  authMiddleware,
  authorizeRoles("SANCTION", "ADMIN"),
  rejectLoan
);

export default router;