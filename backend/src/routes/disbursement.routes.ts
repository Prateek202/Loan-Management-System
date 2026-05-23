import express from "express";

import authMiddleware from "../middleware/auth.middleware";

import authorizeRoles from "../middleware/role.middleware";

import {
  getSanctionedLoans,
  disburseLoan,
} from "../controllers/disbursement.controller";

const router = express.Router();

router.get(
  "/loans",
  authMiddleware,
  authorizeRoles(
    "DISBURSEMENT",
    "ADMIN"
  ),
  getSanctionedLoans
);

router.patch(
  "/:id",
  authMiddleware,
  authorizeRoles(
    "DISBURSEMENT",
    "ADMIN"
  ),
  disburseLoan
);

export default router;