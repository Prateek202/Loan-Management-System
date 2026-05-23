import mongoose from "mongoose";

const loanSchema = new mongoose.Schema(
  {
    borrowerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    loanAmount: Number,

    tenureDays: Number,

    interestRate: {
      type: Number,
      default: 12,
    },

    interestAmount: Number,

    totalRepayment: Number,

    status: {
      type: String,
      enum: [
        "APPLIED",
        "SANCTIONED",
        "REJECTED",
        "DISBURSED",
        "CLOSED",
      ],
      default: "APPLIED",
    },

    rejectionReason: String,

    totalPaid: {
      type: Number,
      default: 0,
    },

    outstandingAmount: Number,

    disbursedAt: Date,

    closedAt: Date,
  },
  { timestamps: true }
);

export default mongoose.model("Loan", loanSchema);