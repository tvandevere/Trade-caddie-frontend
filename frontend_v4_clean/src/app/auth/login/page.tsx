"use client";

import LoginForm from "@/components/auth/LoginForm";
import React from "react";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <LoginForm />
    </div>
  );
}

