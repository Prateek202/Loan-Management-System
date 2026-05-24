"use client";

import { useState } from "react";

import API from "@/services/api";

import toast from "react-hot-toast";

import { useRouter } from "next/navigation";

export default function BorrowerProfilePage() {
  const router = useRouter();

  const [formData, setFormData] =
    useState({
      fullName: "",
      pan: "",
      dob: "",
      monthlySalary: "",
      employmentMode: "",
    });

  const handleChange = (
    e: any
  ) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (
    e: any
  ) => {
    e.preventDefault();

    try {
      await API.post(
        "/borrower/profile",
        formData
      );

      toast.success(
        "Profile Created"
      );

      router.push(
        "/borrower/upload"
      );
    } catch (error: any) {
      if (
        error.response.data.errors
      ) {
        error.response.data.errors.forEach(
          (err: string) => {
            toast.error(err);
          }
        );
      } else {
        toast.error(
          "Something went wrong"
        );
      }
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="border p-6 rounded w-[500px] space-y-4"
      >
        <h1 className="text-2xl font-bold">
          Borrower Profile
        </h1>

        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          className="border p-2 w-full"
          onChange={handleChange}
        />

        <input
          type="text"
          name="pan"
          placeholder="PAN Number"
          className="border p-2 w-full"
          onChange={handleChange}
        />

        <input
          type="date"
          name="dob"
          className="border p-2 w-full"
          onChange={handleChange}
        />

        <input
          type="number"
          name="monthlySalary"
          placeholder="Monthly Salary"
          className="border p-2 w-full"
          onChange={handleChange}
        />

        <select
          name="employmentMode"
          className="border p-2 w-full"
          onChange={handleChange}
        >
          <option value="">
            Select Employment
          </option>

          <option value="SALARIED">
            Salaried
          </option>

          <option value="SELF_EMPLOYED">
            Self Employed
          </option>

          <option value="UNEMPLOYED">
            Unemployed
          </option>
        </select>

        <button className="bg-black text-white px-4 py-2 rounded w-full">
          Submit
        </button>
      </form>
    </div>
  );
}