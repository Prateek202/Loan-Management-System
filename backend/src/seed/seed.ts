import dotenv from "dotenv";

dotenv.config();

import mongoose from "mongoose";

import bcrypt from "bcryptjs";

import User from "../models/User";

mongoose.connect(
  process.env.MONGO_URI as string
);

const seedUsers = async () => {
  await User.deleteMany();

  const password =
    await bcrypt.hash(
      "123456",
      10
    );

  const users = [
    {
      name: "Admin",
      email: "admin@test.com",
      password,
      role: "ADMIN",
    },

    {
      name: "Sales",
      email: "sales@test.com",
      password,
      role: "SALES",
    },

    {
      name: "Sanction",
      email: "sanction@test.com",
      password,
      role: "SANCTION",
    },

    {
      name: "Disbursement",
      email:
        "disbursement@test.com",
      password,
      role: "DISBURSEMENT",
    },

    {
      name: "Collection",
      email:
        "collection@test.com",
      password,
      role: "COLLECTION",
    },

    {
      name: "Borrower",
      email:
        "borrower@test.com",
      password,
      role: "BORROWER",
    },
  ];

  await User.insertMany(users);

  console.log("Seed Completed");

  process.exit();
};

seedUsers();