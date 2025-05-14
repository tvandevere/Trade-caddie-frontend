"use client";

import React from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemeAwareLogo from "@/components/ui/ThemeAwareLogo"; // Import ThemeAwareLogo

const GlobalHeader = () => {
  const { theme, setTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto flex h-20 max-w-screen-2xl items-center"> {/* Increased header height for larger logo */}
        <Link href="/" className="mr-6 flex items-center space-x-3">
          <ThemeAwareLogo 
            alt="Trade Caddie Logo" 
            width={50} // Increased logo size
            height={50} // Increased logo size
            className="rounded-sm object-contain"
          />
          <span className="font-bold text-xl text-primary">Trade Caddie</span> {/* Increased text size slightly */}
        </Link>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            aria-label="Toggle theme"
            className="h-9 w-9 sm:h-10 sm:w-10 text-foreground hover:bg-accent/50"
          >
            <Sun className="h-5 w-5 sm:h-[1.2rem] sm:w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 sm:h-[1.2rem] sm:w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default GlobalHeader;

