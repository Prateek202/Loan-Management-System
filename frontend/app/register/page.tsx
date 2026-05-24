"use client";

import { useState } from "react";

import API from "@/services/api";

import { useRouter } from "next/navigation";

import toast from "react-hot-toast";

export default function RegisterPage() {
  const router = useRouter();

  const [formData, setFormData] =
    useState({
      name: "",
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
      await API.post(
        "/auth/register",
        formData
      );

      toast.success(
        "Registration Successful"
      );

      router.push("/login");
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
          Register
        </h2>

        <input
          type="text"
          name="name"
          placeholder="Name"
          className="border p-2 w-full"
          onChange={handleChange}
        />

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
          Register
        </button>
      </form>
    </div>
  );
}