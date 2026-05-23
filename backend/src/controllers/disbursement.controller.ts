import { Request, Response } from "express";

import Loan from "../models/Loan";

export const getSanctionedLoans =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const loans = await Loan.find({
        status: "SANCTIONED",
      });

      res.json(loans);
    } catch (error) {
      res.status(500).json({
        message: "Server Error",
      });
    }
  };

export const disburseLoan = async (
  req: Request,
  res: Response
) => {
  try {
    const loan = await Loan.findByIdAndUpdate(
      req.params.id,
      {
        status: "DISBURSED",
        disbursedAt: new Date(),
      },
      { new: true }
    );

    res.json(loan);
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};