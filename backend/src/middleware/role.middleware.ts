import { Response, NextFunction } from "express";
import { AuthRequest } from "./auth.middleware";

const authorizeRoles =
  (...roles: string[]) =>
  (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: "Access Denied",
      });
    }

    next();
  };

export default authorizeRoles;