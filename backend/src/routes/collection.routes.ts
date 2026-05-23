import express from "express";

import authMiddleware from "../middleware/auth.middleware";

import authorizeRoles from "../middleware/role.middleware";

import {
  getDisbursedLoans,
  addPayment,
} from "../controllers/collection.controller";

const router = express.Router();

router.get(
  "/loans",
  authMiddleware,
  authorizeRoles(
    "COLLECTION",
    "ADMIN"
  ),
  getDisbursedLoans
);

router.post(
  "/payment",
  authMiddleware,
  authorizeRoles(
    "COLLECTION",
    "ADMIN"
  ),
  addPayment
);

export default router;