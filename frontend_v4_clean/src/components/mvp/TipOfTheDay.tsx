"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Lightbulb } from 'lucide-react';
import ThemeAwareLogo from '@/components/ui/ThemeAwareLogo';

const tips = [
  "Consistency is key in trading. Stick to your plan even when emotions run high.",
  "Never risk more than you can afford to lose on a single trade.",
  "Always do your own research before making any investment decisions.",
  "Patience pays. Wait for your setup, don't chase the market.",
  "Learning from your losses is just as important as celebrating your wins.",
  "Keep a trading journal. It's one of the best tools for improvement.",
  "Understand market psychology; it often drives short-term movements."
];

const TipOfTheDay = () => {
  const [tip, setTip] = useState("");

  useEffect(() => {
    // Select a random tip on component mount
    const randomIndex = Math.floor(Math.random() * tips.length);
    setTip(tips[randomIndex]);
  }, []);

  if (!tip) return null;

  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card border border-border rounded-lg w-full">
      <CardHeader className="pb-3 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Lightbulb size={24} className="text-primary" />
          </div>
          <div>
            <CardTitle className="text-xl font-semibold text-primary">Caddie's Tip of the Day</CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 pt-1">
                <ThemeAwareLogo alt="Trade Caddie" width={32} height={32} className="rounded-full" />
            </div>
            <p className="text-md text-foreground italic">
              \"{tip}\"
            </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default TipOfTheDay;

