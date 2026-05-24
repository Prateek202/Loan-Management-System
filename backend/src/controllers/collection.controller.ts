import { Request, Response } from "express";

import Loan from "../models/Loan";

import Payment from "../models/Payment";

export const getDisbursedLoans =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const loans = await Loan.find({
        status: "DISBURSED",
      });

      res.json(loans);
    } catch (error) {
      res.status(500).json({
        message: "Server Error",
      });
    }
  };

export const addPayment = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      loanId,
      utrNumber,
      amount,
    } = req.body;

    const existingUTR =
      await Payment.findOne({
        utrNumber,
      });

    if (existingUTR) {
      return res.status(400).json({
        message: "Duplicate UTR Number",
      });
    }

    const loan: any =
      await Loan.findById(loanId);

    if (!loan) {
      return res.status(404).json({
        message: "Loan not found",
      });
    }

    if (amount <= 0) {
      return res.status(400).json({
      message:
      "Payment amount must be greater than 0",
      });
    }



    if (
      amount > loan.outstandingAmount
    ) {
      return res.status(400).json({
        message:
          "Payment exceeds outstanding amount",
      });
    }


    await Payment.create({
      loanId,
      utrNumber,
      amount,
    });

    loan.totalPaid += amount;

    loan.outstandingAmount -= amount;

    if (
      loan.outstandingAmount <= 0
    ) {
      loan.status = "CLOSED";
      loan.closedAt = new Date();
    }

    await loan.save();

    res.json({
      success: true,
      loan,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};