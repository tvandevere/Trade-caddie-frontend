"use client";

import React, { ReactNode } from 'react';
import BottomNavbar from "@/components/layout/BottomNavbar";
import GlobalHeader from "@/components/layout/GlobalHeader"; // Import the GlobalHeader
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

interface TabsLayoutProps {
  children: ReactNode;
}

const TabsLayout = ({ children }: TabsLayoutProps) => {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/auth/login");
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading || !isAuthenticated) {
    // You can render a loading spinner or a blank page here
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <GlobalHeader /> {/* Add the GlobalHeader here */}
      <main className="flex-1 pt-14 pb-16"> {/* Add padding-top for header and padding-bottom for navbar */}
        {children}
      </main>
      <BottomNavbar />
    </div>
  );
};

export default TabsLayout;

