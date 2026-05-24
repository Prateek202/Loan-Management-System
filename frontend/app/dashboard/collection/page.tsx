"use client";

import { useEffect, useState } from "react";

import API from "@/services/api";

import toast from "react-hot-toast";

import Navbar from "@/components/Navbar";

import ProtectedRoute from "@/components/ProtectedRoute";

export default function CollectionPage() {
  const [loans, setLoans] =
    useState<any[]>([]);

  const [paymentData,
    setPaymentData] =
    useState({
      utrNumber: "",
      amount: "",
    });

  const fetchLoans =
    async () => {
      const res =
        await API.get(
          "/collection/loans"
        );

      setLoans(res.data);
    };

  useEffect(() => {
    fetchLoans();
  }, []);

  const addPayment =
    async (
      loanId: string
    ) => {
      try {
        await API.post(
          "/collection/payment",
          {
            loanId,
            utrNumber:
              paymentData.utrNumber,
            amount:
              Number(
                paymentData.amount
              ),
          }
        );

        toast.success(
          "Payment Added"
        );

        fetchLoans();
      } catch (error: any) {
        toast.error(
          error.response.data.message
        );
      }
    };

  return (
    <ProtectedRoute
      allowedRoles={[
        "COLLECTION",
        "ADMIN",
      ]}
    >
      <Navbar />

      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">
          Collection Dashboard
        </h1>

        <div className="space-y-6">
          {loans.map((loan) => (
            <div
              key={loan._id}
              className="border p-4 rounded"
            >
              <p>
                Loan:
                ₹
                {
                  loan.loanAmount
                }
              </p>

              <p>
                Outstanding:
                ₹
                {
                  loan.outstandingAmount
                }
              </p>

              <input
                type="text"
                placeholder="UTR Number"
                className="border p-2 w-full mt-2"
                onChange={(e) =>
                  setPaymentData({
                    ...paymentData,
                    utrNumber:
                      e.target
                        .value,
                  })
                }
              />

              <input
                type="number"
                placeholder="Amount"
                className="border p-2 w-full mt-2"
                onChange={(e) =>
                  setPaymentData({
                    ...paymentData,
                    amount:
                      e.target
                        .value,
                  })
                }
              />

              <button
                onClick={() =>
                  addPayment(
                    loan._id
                  )
                }
                className="bg-black text-white px-4 py-2 rounded mt-4"
              >
                Add Payment
              </button>
            </div>
          ))}
        </div>
      </div>
    </ProtectedRoute>
  );
}