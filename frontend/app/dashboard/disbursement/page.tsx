"use client";

import { useEffect, useState } from "react";

import API from "@/services/api";

import toast from "react-hot-toast";

import ProtectedRoute from "@/components/ProtectedRoute";

import Navbar from "@/components/Navbar";

export default function DisbursementPage() {
  const [loans, setLoans] =
    useState<any[]>([]);

  const fetchLoans =
    async () => {
      const res =
        await API.get(
          "/disbursement/loans"
        );

      setLoans(res.data);
    };

  useEffect(() => {
    fetchLoans();
  }, []);

  const disburseLoan =
    async (id: string) => {
      try {
        await API.patch(
          `/disbursement/${id}`
        );

        toast.success(
          "Loan Disbursed"
        );

        fetchLoans();
      } catch (error) {
        toast.error(
          "Failed"
        );
      }
    };

  return (
    <ProtectedRoute
      allowedRoles={[
        "DISBURSEMENT",
        "ADMIN",
      ]}
    >
      <Navbar />

      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">
          Disbursement Dashboard
        </h1>

        <div className="space-y-4">
          {loans.map((loan) => (
            <div
              key={loan._id}
              className="border p-4 rounded"
            >
              <p>
                Amount:
                ₹
                {
                  loan.loanAmount
                }
              </p>

              <p>
                Status:
                {loan.status}
              </p>

              <button
                onClick={() =>
                  disburseLoan(
                    loan._id
                  )
                }
                className="bg-black text-white px-4 py-2 rounded mt-4"
              >
                Disburse
              </button>
            </div>
          ))}
        </div>
      </div>
    </ProtectedRoute>
  );
}