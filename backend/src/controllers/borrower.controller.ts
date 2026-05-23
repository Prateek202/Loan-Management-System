import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import BorrowerProfile from "../models/BorrowerProfile";
import { runBRE } from "../utils/bre";

export const createProfile = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const {
      fullName,
      pan,
      dob,
      monthlySalary,
      employmentMode,
    } = req.body;

    const breErrors = runBRE(
      dob,
      monthlySalary,
      employmentMode,
      pan
    );

    if (breErrors.length > 0) {
      return res.status(400).json({
        success: false,
        errors: breErrors,
      });
    }

    const profile = await BorrowerProfile.create({
      userId: req.user.userId,
      fullName,
      pan,
      dob,
      monthlySalary,
      employmentMode,
      isEligible: true,
    });

    res.status(201).json({
      success: true,
      profile,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

export const uploadSalarySlip =
  async (
    req: AuthRequest,
    res: Response
  ) => {
    try {
      const profile: any =
        await BorrowerProfile.findOne({
          userId: req.user.userId,
        });

      if (!profile) {
        return res.status(404).json({
          message:
            "Profile not found",
        });
      }

      profile.salarySlipUrl =
        req.file?.path;

      await profile.save();

      res.json({
        success: true,
        profile,
      });
    } catch (error) {
      res.status(500).json({
        message: "Server Error",
      });
    }
  };