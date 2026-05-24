"use client";

import { useEffect, useState } from "react";

import API from "@/services/api";

import Navbar from "@/components/Navbar";

import ProtectedRoute from "@/components/ProtectedRoute";

export default function SalesPage() {
  const [leads, setLeads] =
    useState<any[]>([]);

  useEffect(() => {
    const fetchLeads =
      async () => {
        const res =
          await API.get(
            "/sales/leads"
          );

        setLeads(res.data);
      };

    fetchLeads();
  }, []);

  return (
    <ProtectedRoute
      allowedRoles={[
        "SALES",
        "ADMIN",
      ]}
    >
      <Navbar />

      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">
          Sales Dashboard
        </h1>

        <div className="space-y-4">
          {leads.map((lead) => (
            <div
              key={lead._id}
              className="border p-4 rounded"
            >
              <p>
                {lead.name}
              </p>

              <p>
                {lead.email}
              </p>
            </div>
          ))}
        </div>
      </div>
    </ProtectedRoute>
  );
}