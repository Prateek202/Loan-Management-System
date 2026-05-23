import { Request, Response } from "express";

import Loan from "../models/Loan";

export const getAppliedLoans = async (
  req: Request,
  res: Response
) => {
  try {
    const loans = await Loan.find({
      status: "APPLIED",
    }).populate("borrowerId");

    res.json(loans);
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

export const approveLoan = async (
  req: Request,
  res: Response
) => {
  try {
    const loan = await Loan.findByIdAndUpdate(
      req.params.id,
      {
        status: "SANCTIONED",
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

export const rejectLoan = async (
  req: Request,
  res: Response
) => {
  try {
    const { reason } = req.body;

    const loan = await Loan.findByIdAndUpdate(
      req.params.id,
      {
        status: "REJECTED",
        rejectionReason: reason,
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