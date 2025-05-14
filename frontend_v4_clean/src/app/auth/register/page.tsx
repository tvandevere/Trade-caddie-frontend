"use client";

import RegistrationForm from "@/components/auth/RegistrationForm";
import React from "react";

export default function RegisterPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <RegistrationForm />
    </div>
  );
}

