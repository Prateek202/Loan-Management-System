import { Response } from "express";

import { AuthRequest } from "../middleware/auth.middleware";

import Loan from "../models/Loan";

import { calculateLoan } from "../utils/calculateLoan";

export const applyLoan = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const {
      loanAmount,
      tenureDays,
    } = req.body;

    if (
      loanAmount < 50000 ||
      loanAmount > 500000
    ) {
      return res.status(400).json({
        message:
          "Loan amount should be between 50K and 5L",
      });
    }

    if (
      tenureDays < 30 ||
      tenureDays > 365
    ) {
      return res.status(400).json({
        message:
          "Tenure should be between 30 and 365 days",
      });
    }

    const {
      interestAmount,
      totalRepayment,
    } = calculateLoan(
      loanAmount,
      tenureDays
    );

    const loan = await Loan.create({
      borrowerId: req.user.userId,
      loanAmount,
      tenureDays,
      interestAmount,
      totalRepayment,
      outstandingAmount: totalRepayment,
    });

    res.status(201).json({
      success: true,
      loan,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

export const getMyLoans = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const loans = await Loan.find({
      borrowerId: req.user.userId,
    });

    res.json(loans);
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};