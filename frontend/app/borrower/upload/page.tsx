"use client";

import { useState } from "react";

import API from "@/services/api";

import toast from "react-hot-toast";

import { useRouter } from "next/navigation";

export default function UploadPage() {
  const router = useRouter();

  const [file, setFile] =
    useState<File | null>(null);

  const handleUpload = async (
    e: any
  ) => {
    e.preventDefault();

    if (!file) {
      toast.error(
        "Please select file"
      );
      return;
    }

    const formData =
      new FormData();

    formData.append(
      "salarySlip",
      file
    );

    try {
      await API.post(
        "/borrower/upload",
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      toast.success(
        "Salary Slip Uploaded"
      );

      router.push(
        "/borrower/apply"
      );
    } catch (error: any) {
      toast.error(
        error.response?.data
          ?.message ||
          "Upload failed"
      );
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <form
        onSubmit={handleUpload}
        className="border p-6 rounded w-[400px] space-y-4"
      >
        <h1 className="text-2xl font-bold">
          Upload Salary Slip
        </h1>

        <input
          type="file"
          accept=".pdf,.png,.jpg,.jpeg"
          onChange={(e: any) =>
            setFile(
              e.target.files[0]
            )
          }
        />

        <button className="bg-black text-white px-4 py-2 rounded w-full">
          Upload
        </button>
      </form>
    </div>
  );
}