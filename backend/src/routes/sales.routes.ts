import express from "express";

import authMiddleware from "../middleware/auth.middleware";

import authorizeRoles from "../middleware/role.middleware";

import { getLeads } from "../controllers/sales.controller";

const router = express.Router();

router.get(
  "/leads",
  authMiddleware,
  authorizeRoles(
    "SALES",
    "ADMIN"
  ),
  getLeads
);

export default router;