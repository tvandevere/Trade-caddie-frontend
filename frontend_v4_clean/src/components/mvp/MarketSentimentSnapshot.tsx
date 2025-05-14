"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { TrendingUp, TrendingDown, MinusCircle, HelpCircle } from 'lucide-react';
import ThemeAwareLogo from '@/components/ui/ThemeAwareLogo';

// For MVP, sentiment will be static or randomly chosen. In a real app, this would come from an API.
type Sentiment = 'Bullish' | 'Bearish' | 'Neutral' | 'Unknown';

const sentiments: Sentiment[] = ['Bullish', 'Bearish', 'Neutral'];

const MarketSentimentSnapshot = () => {
  const [currentSentiment, setCurrentSentiment] = useState<Sentiment>('Unknown');
  const [lastUpdated, setLastUpdated] = useState<string>('');

  useEffect(() => {
    // Simulate fetching sentiment data
    const randomIndex = Math.floor(Math.random() * sentiments.length);
    setCurrentSentiment(sentiments[randomIndex]);
    setLastUpdated(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
  }, []);

  const getSentimentIcon = () => {
    switch (currentSentiment) {
      case 'Bullish':
        return <TrendingUp size={28} className="text-green-500" />;
      case 'Bearish':
        return <TrendingDown size={28} className="text-red-500" />;
      case 'Neutral':
        return <MinusCircle size={28} className="text-yellow-500" />;
      default:
        return <HelpCircle size={28} className="text-muted-foreground" />;
    }
  };

  const getSentimentColor = () => {
    switch (currentSentiment) {
      case 'Bullish':
        return 'text-green-500';
      case 'Bearish':
        return 'text-red-500';
      case 'Neutral':
        return 'text-yellow-500';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card border border-border rounded-lg w-full">
      <CardHeader className="pb-3 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            {getSentimentIcon()}
          </div>
          <div>
            <CardTitle className={`text-xl font-semibold ${getSentimentColor()}`}>
              Caddie's Market Sentiment
            </CardTitle>
            <CardDescription className="text-xs text-muted-foreground mt-1">
              Quick Snapshot (Last updated: {lastUpdated})
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
                <ThemeAwareLogo alt="Trade Caddie" width={32} height={32} className="rounded-full" />
            </div>
            <p className={`text-2xl font-bold ${getSentimentColor()}`}>
              {currentSentiment}
            </p>
        </div>
        <p className="text-sm text-muted-foreground mt-2">
          Your Caddie's current take on the general market mood. Remember, this is a high-level view for quick orientation!
        </p>
      </CardContent>
    </Card>
  );
};

export default MarketSentimentSnapshot;

