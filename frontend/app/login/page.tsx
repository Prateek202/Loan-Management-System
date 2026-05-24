"use client";

import { useState } from "react";

import API from "@/services/api";

import toast from "react-hot-toast";

import { useRouter } from "next/navigation";

import { jwtDecode } from "jwt-decode";

export default function LoginPage() {
  const router = useRouter();

  const [formData, setFormData] =
    useState({
      email: "",
      password: "",
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
      const res = await API.post(
        "/auth/login",
        formData
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      toast.success(
        "Login Successful"
      );

      const decoded: any =
        jwtDecode(res.data.token);

      const role =
        decoded.role;

      if (
        role === "BORROWER"
      ) {
        router.push(
          "/borrower/profile"
        );
      } else if (
        role === "SANCTION"
      ) {
        router.push(
          "/dashboard/sanction"
        );
      } else if (
        role ===
        "DISBURSEMENT"
      ) {
        router.push(
          "/dashboard/disbursement"
        );
      } else if (
        role === "COLLECTION"
      ) {
        router.push(
          "/dashboard/collection"
        );
      }else if (role === "SALES") {
          router.push("/dashboard/sales");
      }else if (role === "ADMIN") {
          router.push("/dashboard/sales");
        }  
       else {
        router.push("/");
      }
    } catch (error: any) {
      toast.error(
        error.response.data.message
      );
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="border p-6 rounded w-[400px] space-y-4"
      >
        <h2 className="text-2xl font-bold">
          Login
        </h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="border p-2 w-full"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="border p-2 w-full"
          onChange={handleChange}
        />

        <button className="bg-black text-white px-4 py-2 rounded w-full">
          Login
        </button>
      </form>
    </div>
  );
}