"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from 'next/navigation'; // Ensures usePathname is imported
import {
  Sunrise,
  LineChart,
  Sunset,
  BookOpen,
  Users,
} from "lucide-react";

// Corrected navigation paths
const navItems = [
  { href: "/premarket", label: "Pre-Market", phaseId: "Pre-Market", icon: <Sunrise size={22} strokeWidth={1.75} /> },
  { href: "/market", label: "Market",  phaseId: "Market", icon: <LineChart size={22} strokeWidth={1.75} /> },
  { href: "/postmarket", label: "Post-Market", phaseId: "Post-Market", icon: <Sunset size={22} strokeWidth={1.75} /> },
  { href: "/education", label: "Education", icon: <BookOpen size={22} strokeWidth={1.75} /> },
  { href: "/community", label: "Community", icon: <Users size={22} strokeWidth={1.75} /> },
];

const getCurrentTradingPhase = () => {
  const now = new Date();
  const currentHour = now.getHours();

  if (currentHour >= 4 && currentHour < 9) {
    return "Pre-Market";
  }
  if (currentHour >= 9 && currentHour < 16) {
    return "Market";
  }
  if (currentHour >= 16 && currentHour < 20) {
    return "Post-Market";
  }
  return null;
};

const BottomNavbar = () => {
  const pathname = usePathname(); // Ensures usePathname is called correctly
  const [currentPhase, setCurrentPhase] = useState<string | null>(null);

  useEffect(() => {
    setCurrentPhase(getCurrentTradingPhase());
    const interval = setInterval(() => {
      setCurrentPhase(getCurrentTradingPhase());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-border/60 shadow-md z-50">
      <div className="container mx-auto px-2 sm:px-4">
        <div className="flex justify-around items-stretch h-16">
          {navItems.map((item) => {
            const isActivePath = pathname === item.href || (pathname.startsWith(item.href) && item.href !== "/");
            const isTradingPhaseActive = item.phaseId && item.phaseId === currentPhase;
            
            let itemClasses = `flex flex-1 flex-col items-center justify-center text-xs transition-all duration-200 ease-in-out group pt-1 pb-1 `;
            if (isActivePath) {
              itemClasses += "text-primary font-medium border-t-2 border-primary";
            } else if (isTradingPhaseActive) {
              itemClasses += "text-yellow-500 font-medium border-t-2 border-yellow-500 bg-yellow-500/10";
            } else {
              itemClasses += "text-muted-foreground hover:text-foreground hover:bg-accent/50";
            }

            let iconClasses = "";
            if (isActivePath) {
              iconClasses = "text-primary";
            } else if (isTradingPhaseActive) {
              iconClasses = "text-yellow-500";
            } else {
              iconClasses = "text-muted-foreground group-hover:text-foreground";
            }

            let labelClasses = "mt-0.5 truncate ";
             if (isActivePath) {
              labelClasses += "text-primary";
            } else if (isTradingPhaseActive) {
              labelClasses += "text-yellow-500";
            } else {
              labelClasses += "text-muted-foreground group-hover:text-foreground";
            }

            return (
              <Link key={item.label} href={item.href} legacyBehavior>
                <a className={itemClasses}>
                  <div className={`p-1 rounded-md ${isActivePath ? "" : (isTradingPhaseActive ? "" : "group-hover:bg-accent")}`}>
                    {React.cloneElement(item.icon, {
                      className: iconClasses,
                    })}
                  </div>
                  <span className={labelClasses}>{item.label}</span>
                </a>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default BottomNavbar;

