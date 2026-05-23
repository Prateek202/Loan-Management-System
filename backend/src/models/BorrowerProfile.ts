import mongoose from "mongoose";

const borrowerProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    fullName: String,

    pan: String,

    dob: String,

    monthlySalary: Number,

    employmentMode: String,

    salarySlipUrl: String,

    isEligible: Boolean,
  },
  { timestamps: true }
);

export default mongoose.model(
  "BorrowerProfile",
  borrowerProfileSchema
);