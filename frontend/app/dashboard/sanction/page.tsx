"use client";

import { useEffect, useState } from "react";

import API from "@/services/api";

import toast from "react-hot-toast";

import ProtectedRoute from "@/components/ProtectedRoute";

import Navbar from "@/components/Navbar";

export default function SanctionPage() {
  const [loans, setLoans] =
    useState<any[]>([]);

  const fetchLoans =
    async () => {
      try {
        const res =
          await API.get(
            "/sanction/loans"
          );

        setLoans(res.data);
      } catch (error) {
        console.log(error);
      }
    };

  useEffect(() => {
    fetchLoans();
  }, []);

  const approveLoan =
    async (id: string) => {
      try {
        await API.patch(
          `/sanction/${id}/approve`
        );

        toast.success(
          "Loan Approved"
        );

        fetchLoans();
      } catch (error) {
        toast.error(
          "Approval Failed"
        );
      }
    };

  const rejectLoan =
    async (id: string) => {
      const reason =
        prompt(
          "Enter rejection reason"
        );

      if (!reason) return;

      try {
        await API.patch(
          `/sanction/${id}/reject`,
          {
            reason,
          }
        );

        toast.success(
          "Loan Rejected"
        );

        fetchLoans();
      } catch (error) {
        toast.error(
          "Rejection Failed"
        );
      }
    };

  return (
    <ProtectedRoute
      allowedRoles={[
        "SANCTION",
        "ADMIN",
      ]}
    >
      <Navbar />

      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">
          Sanction Dashboard
        </h1>

        <div className="space-y-4">
          {loans.map((loan) => (
            <div
              key={loan._id}
              className="border p-4 rounded"
            >
              <p>
                Loan Amount:
                ₹
                {
                  loan.loanAmount
                }
              </p>

              <p>
                Tenure:
                {
                  loan.tenureDays
                } days
              </p>

              <p>
                Status:
                {loan.status}
              </p>

              <div className="flex gap-4 mt-4">
                <button
                  onClick={() =>
                    approveLoan(
                      loan._id
                    )
                  }
                  className="bg-green-500 text-white px-4 py-2 rounded"
                >
                  Approve
                </button>

                <button
                  onClick={() =>
                    rejectLoan(
                      loan._id
                    )
                  }
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ProtectedRoute>
  );
}