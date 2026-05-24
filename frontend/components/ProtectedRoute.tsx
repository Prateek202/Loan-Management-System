"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { jwtDecode } from "jwt-decode";

export default function ProtectedRoute({
  children,
  allowedRoles,
}: {
  children: React.ReactNode;

  allowedRoles: string[];
}) {
  const router = useRouter();

  const [authorized,
    setAuthorized] =
    useState(false);

  useEffect(() => {
    const token =
      localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    const decoded: any =
      jwtDecode(token);

    const role =
      decoded.role;

    if (
      allowedRoles.includes(
        role
      )
    ) {
      setAuthorized(true);
    } else {
      router.push("/login");
    }
  }, []);

  if (!authorized) {
    return (
      <div className="p-10">
        Loading...
      </div>
    );
  }

  return <>{children}</>;
}