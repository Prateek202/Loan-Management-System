import { Request, Response } from "express";

import User from "../models/User";

import Loan from "../models/Loan";

export const getLeads =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const borrowers =
        await User.find({
          role: "BORROWER",
        });

      const loans =
        await Loan.find();

      const appliedUsers =
        loans.map(
          (loan: any) =>
            loan.borrowerId.toString()
        );

      const leads =
        borrowers.filter(
          (user: any) =>
            !appliedUsers.includes(
              user._id.toString()
            )
        );

      res.json(leads);
    } catch (error) {
      res.status(500).json({
        message:
          "Server Error",
      });
    }
  };