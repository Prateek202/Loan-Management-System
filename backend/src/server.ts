import dns from "dns";
import salesRoutes from "./routes/sales.routes";
dns.setDefaultResultOrder("ipv4first");




import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db";

import authRoutes from "./routes/auth.routes";
import borrowerRoutes from "./routes/borrower.routes";
import loanRoutes from "./routes/loan.routes";
import sanctionRoutes from "./routes/sanction.routes";
import disbursementRoutes from "./routes/disbursement.routes";
import collectionRoutes from "./routes/collection.routes";

dotenv.config();

connectDB();

const app = express();
app.use(
  cors({
    origin: "*",
  })
);
app.use(cors());
app.use(express.json());

app.use("/uploads", express.static("uploads"));

app.use("/api/auth", authRoutes);
app.use("/api/borrower", borrowerRoutes);
app.use("/api/loan", loanRoutes);
app.use("/api/sanction", sanctionRoutes);
app.use("/api/disbursement", disbursementRoutes);
app.use("/api/collection", collectionRoutes);
app.use("/api/sales", salesRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});