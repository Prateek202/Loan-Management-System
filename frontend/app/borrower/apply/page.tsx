"use client";

import { useState } from "react";

import API from "@/services/api";

import toast from "react-hot-toast";

export default function ApplyLoanPage() {
  const [loanAmount,
    setLoanAmount] =
    useState(100000);

  const [tenureDays,
    setTenureDays] =
    useState(180);

  const interestRate = 12;

  const interest =
    (loanAmount *
      interestRate *
      tenureDays) /
    (365 * 100);

  const totalRepayment =
    loanAmount + interest;

  const handleApply =
    async () => {
      try {
        await API.post(
          "/loan/apply",
          {
            loanAmount,
            tenureDays,
          }
        );

        toast.success(
          "Loan Applied Successfully"
        );
      } catch (error: any) {
        toast.error(
          error.response.data.message
        );
      }
    };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="border p-6 rounded w-[500px] space-y-6">
        <h1 className="text-2xl font-bold">
          Apply Loan
        </h1>

        <div>
          <label>
            Loan Amount:
            ₹{loanAmount}
          </label>

          <input
            type="range"
            min="50000"
            max="500000"
            step="10000"
            value={loanAmount}
            onChange={(e) =>
              setLoanAmount(
                Number(
                  e.target.value
                )
              )
            }
            className="w-full"
          />
        </div>

        <div>
          <label>
            Tenure:
            {tenureDays} days
          </label>

          <input
            type="range"
            min="30"
            max="365"
            value={tenureDays}
            onChange={(e) =>
              setTenureDays(
                Number(
                  e.target.value
                )
              )
            }
            className="w-full"
          />
        </div>

        <div className="border p-4 rounded">
          <p>
            Interest Rate:
            12%
          </p>

          <p>
            Interest:
            ₹
            {interest.toFixed(
              2
            )}
          </p>

          <p>
            Total Repayment:
            ₹
            {totalRepayment.toFixed(
              2
            )}
          </p>
        </div>

        <button
          onClick={handleApply}
          className="bg-black text-white px-4 py-2 rounded w-full"
        >
          Apply Loan
        </button>
      </div>
    </div>
  );
}