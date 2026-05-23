import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: String,

    email: {
      type: String,
      unique: true,
    },

    password: String,

    role: {
      type: String,
      enum: [
        "BORROWER",
        "ADMIN",
        "SALES",
        "SANCTION",
        "DISBURSEMENT",
        "COLLECTION",
      ],
      default: "BORROWER",
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);