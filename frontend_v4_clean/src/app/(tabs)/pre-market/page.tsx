"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AIChatBot from '@//components/ai/AIChatBot'; // Corrected path
import { Separator } from '@//components/ui/separator'; // Corrected path
import { CalendarDays, TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react';

// Mocked data for Pre-Market Tab
const mockPreMarketRoutine = [
  "Good morning, MockUser! MentorBull here. Let's get you prepped for the trading day.",
  "Based on your watchlist (AAPL, TSLA, MSFT) and current market sentiment, here’s the outlook:",
  "AAPL: Showing pre-market strength around $175.50, potentially reacting to positive analyst notes on their Vision Pro supply chain improvements. Key resistance at $177, support at $174.",
  "TSLA: Volatile in pre-market, hovering near $178. Watch for reactions to competitor EV announcements and overall market direction. Key levels: $175 support, $182 resistance.",
  "MSFT: Trading steadily near $410. Upcoming cloud computing conference could be a catalyst. Support at $407, resistance at $415.",
  "Overall market sentiment is cautiously optimistic. The VIX is at 14.5, suggesting reduced fear, but be mindful of today's CPI data release at 8:30 AM EST.",
  "What specific security or market aspect would you like to analyze further before the bell?"
];

const mockMarketOverview = {
  SPY: { change: "+0.45%", value: "$512.30", news: "S&P 500 futures up, eyeing inflation data.", sentiment: "Neutral-Bullish", volume: "1.3M" },
  QQQ: { change: "+0.60%", value: "$438.10", news: "Nasdaq futures leading, tech sentiment positive.", sentiment: "Bullish", volume: "1.1M" },
  DIA: { change: "+0.25%", value: "$387.90", news: "Dow futures showing modest gains.", sentiment: "Neutral", volume: "850K" },
  IWM: { change: "-0.10%", value: "$199.80", news: "Russell 2000 futures slightly down.", sentiment: "Neutral-Bearish", volume: "1.2M" },
};

const mockEconomicCalendar = [
  { time: "8:30 AM EST", event: "Consumer Price Index (CPI) m/m", importance: "High", actual: "-", forecast: "0.3%", previous: "0.4%" },
  { time: "8:30 AM EST", event: "Core CPI m/m", importance: "High", actual: "-", forecast: "0.3%", previous: "0.4%" },
  { time: "10:00 AM EST", event: "Wholesale Inventories m/m", importance: "Medium", actual: "-", forecast: "0.2%", previous: "-0.1%" },
  { time: "2:00 PM EST", event: "FOMC Meeting Minutes", importance: "High", actual: "-", forecast: "-", previous: "-" },
];

const mockTopMovers = {
  gainers: [
    { symbol: "XYZ", change: "+15.2%", price: "$12.50", news: "Positive trial results announced." },
    { symbol: "ABC", change: "+10.8%", price: "$5.75", news: "Rumored acquisition target." },
  ],
  losers: [
    { symbol: "DEF", change: "-12.5%", price: "$22.30", news: "Earnings miss expectations." },
    { symbol: "GHI", change: "-9.7%", price: "$8.15", news: "Downgraded by analyst." },
  ],
};

const PreMarketPage = () => {
  return (
    <div className="container mx-auto py-4 px-2 sm:px-4 md:py-6">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-foreground text-center sm:text-left">Pre-Market Dashboard</h1>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* AI-Driven Routine - takes more space on larger screens */}
        <Card className="lg:col-span-2 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="pb-4">
            <div className="flex items-center space-x-3 mb-2">
              <img src="/trade_mentor_ai_logo.png" alt="MentorBull Icon" className="w-10 h-10 rounded-full" />
              <CardTitle className="text-xl sm:text-2xl">MentorBull's Morning Briefing</CardTitle>
            </div>
            <CardDescription>Your personalized pre-market checklist and AI-powered insights.</CardDescription>
          </CardHeader>
          <CardContent>
            <AIChatBot 
              aiPersonaName="MentorBull"
              aiPersonaImage="/trade_mentor_ai_logo.png" 
              initialMessages={mockPreMarketRoutine.map((text, index) => ({
                id: `routine-${index}`,
                sender: 'ai',
                text: text,
                timestamp: new Date(Date.now() - (mockPreMarketRoutine.length - index) * 60000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
              }))}
              contextualPrompt="What are your key focus areas for today's session?"
              showUserInput={true}
            />
          </CardContent>
        </Card>

        {/* Right Column: Market Pulse, Economic Calendar, Top Movers */}
        <div className="lg:col-span-1 space-y-6">
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="pb-2">
                    <CardTitle className="text-xl sm:text-2xl">Market Pulse</CardTitle>
                    <CardDescription>Quick look at key index futures.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                    {Object.entries(mockMarketOverview).map(([symbol, data]) => (
                        <div key={symbol} className="p-3 rounded-lg border border-border/60 bg-card/50 hover:bg-accent/30 transition-colors">
                            <div className="flex justify-between items-center mb-1">
                                <span className="text-md font-semibold text-foreground">{symbol}</span>
                                <span className={`text-md font-bold ${data.change.startsWith("+") ? 'text-green-500 dark:text-green-400' : 'text-red-500 dark:text-red-400'}`}>{data.change}</span>
                            </div>
                            <p className="text-sm text-muted-foreground mb-0.5">{data.value} <span className='text-xs'>Vol: {data.volume}</span></p>
                            <p className="text-xs text-muted-foreground leading-tight">{data.news}</p>
                        </div>
                    ))}
                    </div>
                </CardContent>
            </Card>

            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="pb-2">
                    <div className="flex items-center space-x-2">
                        <CalendarDays className="h-6 w-6 text-primary" />
                        <CardTitle className="text-xl sm:text-2xl">Economic Calendar</CardTitle>
                    </div>
                    <CardDescription>Key events to watch today.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3 text-sm">
                        {mockEconomicCalendar.map((event, index) => (
                            <div key={index} className="p-2 rounded-md border border-border/40 bg-card/30">
                                <div className="flex justify-between items-center">
                                    <span className="font-semibold text-foreground">{event.event}</span>
                                    <span className={`text-xs px-2 py-0.5 rounded-full ${event.importance === 'High' ? 'bg-red-500/20 text-red-700 dark:text-red-400' : 'bg-yellow-500/20 text-yellow-700 dark:text-yellow-400'}`}>{event.importance}</span>
                                </div>
                                <p className="text-muted-foreground text-xs">Time: {event.time}</p>
                                <p className="text-muted-foreground text-xs">Forecast: {event.forecast} | Previous: {event.previous}</p>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="pb-2">
                     <div className="flex items-center space-x-2">
                        <TrendingUp className="h-6 w-6 text-green-500" />
                        <TrendingDown className="h-6 w-6 text-red-500" />
                        <CardTitle className="text-xl sm:text-2xl">Pre-Market Movers</CardTitle>
                    </div>
                    <CardDescription>Top gainers and losers before the bell.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="mb-3">
                        <h4 className="font-semibold text-green-600 dark:text-green-500 mb-1">Top Gainers</h4>
                        {mockTopMovers.gainers.map((stock, index) => (
                            <div key={index} className="text-xs p-1.5 rounded bg-green-500/10 mb-1">
                                <div className="flex justify-between items-center">
                                    <span className="font-medium text-foreground">{stock.symbol} ({stock.price})</span>
                                    <span className="font-bold text-green-600 dark:text-green-500">{stock.change}</span>
                                </div>
                                <p className="text-muted-foreground truncate">{stock.news}</p>
                            </div>
                        ))}
                    </div>
                    <div>
                        <h4 className="font-semibold text-red-600 dark:text-red-500 mb-1">Top Losers</h4>
                        {mockTopMovers.losers.map((stock, index) => (
                            <div key={index} className="text-xs p-1.5 rounded bg-red-500/10 mb-1">
                                <div className="flex justify-between items-center">
                                    <span className="font-medium text-foreground">{stock.symbol} ({stock.price})</span>
                                    <span className="font-bold text-red-600 dark:text-red-500">{stock.change}</span>
                                </div>
                                <p className="text-muted-foreground truncate">{stock.news}</p>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

        </div>
      </div>
    </div>
  );
};

export default PreMarketPage;

