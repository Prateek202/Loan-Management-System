"use client";

import Link from "next/link";

import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";

import { getUserRole } from "@/utils/auth";

export default function Navbar() {
  const router = useRouter();

  const [role, setRole] =
    useState("");

  useEffect(() => {
    const userRole =
      getUserRole();

    if (userRole) {
      setRole(userRole);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem(
      "token"
    );

    router.push("/login");
  };

  return (
    <div className="bg-black text-white p-4 flex justify-between">
      <h1 className="font-bold">
        LMS
      </h1>

      <div className="flex gap-4 items-center">
        {(role === "SANCTION" ||
          role === "ADMIN") && (
          <Link href="/dashboard/sanction">
            Sanction
          </Link>
        )}

        {(role ===
          "DISBURSEMENT" ||
          role === "ADMIN") && (
          <Link href="/dashboard/disbursement">
            Disbursement
          </Link>
        )}

        {(role === "COLLECTION" ||
          role === "ADMIN") && (
          <Link href="/dashboard/collection">
            Collection
          </Link>
        )}

        {(role === "SALES" ||
          role === "ADMIN") && (
          <Link href="/dashboard/sales">
            Sales
          </Link>
        )}

        <button
          onClick={logout}
          className="bg-red-500 px-3 py-1 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
}