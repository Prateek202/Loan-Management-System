"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center gap-4">
      <h1 className="text-4xl font-bold">
        Loan Management System
      </h1>

      <div className="flex gap-4">
        <Link
          href="/login"
          className="bg-black text-white px-4 py-2 rounded"
        >
          Login
        </Link>

        <Link
          href="/register"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Register
        </Link>
      </div>
    </div>
  );
}