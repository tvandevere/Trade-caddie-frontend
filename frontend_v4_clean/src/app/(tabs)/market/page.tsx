"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import AIChatBot from '@/components/ai/AIChatBot';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Checkbox } from "@/components/ui/checkbox";
import { CandlestickChart, MessageCircle, Edit3, Zap, TrendingUp, Brain, ListChecks, Info } from 'lucide-react';
import ThemeAwareLogo from '@/components/ui/ThemeAwareLogo';

// Placeholder for TradingView Chart
const TradingViewChartPlaceholder = () => {
  return (
    <div className="w-full h-[350px] sm:h-[450px] bg-muted/30 border border-border rounded-lg flex items-center justify-center shadow-inner">
      <div className="text-center">
        <CandlestickChart size={48} className="mx-auto text-muted-foreground mb-2" />
        <p className="text-muted-foreground font-medium">Live Chart Area</p>
        <p className="text-xs text-muted-foreground">(TradingView Integration Pending)</p>
      </div>
    </div>
  );
};

interface TradeIdea {
  id: string;
  type: "Stock" | "Option";
  security: string;
  idea: string;
  rationale?: string;
  source: string;
  timestamp: string;
  urgency?: "High" | "Medium" | "Low";
}

const mockTradeIdeas: TradeIdea[] = [
  { id: "1", type: "Stock", security: "AAPL", idea: "AAPL showing relative strength, potential for upside if market holds.", rationale: "Holding above key moving averages.", source: "Caddie Scan", timestamp: "9:45 AM", urgency: "Medium" },
  { id: "2", type: "Option", security: "QQQ", idea: "Consider 0DTE QQQ calls if key resistance breaks.", rationale: "High volatility expected today.", source: "Caddie Scan", timestamp: "10:02 AM", urgency: "High" },
  { id: "3", type: "Stock", security: "NVDA", idea: "NVDA consolidating, watch for breakout or breakdown.", rationale: "Recent news catalyst, volume increasing.", source: "Caddie Scan", timestamp: "10:15 AM", urgency: "Medium" },
];

interface LoggedTrade {
  id: string;
  security: string;
  type: string;
  entryPrice: number;
  quantity: number;
  status: "Open" | "Closed";
  currentPrice?: number;
  exitPrice?: number;
  pnl?: number;
}

const mockLoggedTrades: LoggedTrade[] = [];

interface MarketRoutineItem {
  id: string;
  text: string;
  details: string;
  completed: boolean;
  defaultPrompt: string;
}

const initialMarketRoutine: MarketRoutineItem[] = [
  { id: "mr1", text: "Review Account Balance & Open Positions", details: "Check current buying power, margin, and status of any open trades.", completed: false, defaultPrompt: "Caddie, can you give me a quick overview of what to look for when reviewing my account balance and open positions during the market session?" },
  { id: "mr2", text: "Assess Current Market Trend", details: "Observe overall market direction (e.g., S&P 500, Nasdaq) and sector trends.", completed: false, defaultPrompt: "Caddie, what are the key indicators for assessing the current market trend right now?" },
  { id: "mr3", text: "Monitor Key Support/Resistance Levels", details: "Watch price action around pre-identified significant levels for your watched assets.", completed: false, defaultPrompt: "Caddie, how should I effectively monitor key support and resistance levels for my watchlist during active trading?" },
  { id: "mr4", text: "Scan for Entry/Exit Signals", details: "Look for trade setups based on your strategy (e.g., breakouts, pullbacks, indicator signals).", completed: false, defaultPrompt: "Caddie, what are some common entry and exit signals I should be scanning for based on typical day trading strategies?" },
  { id: "mr5", text: "Manage Active Trades", details: "Monitor open positions, adjust stop-losses if necessary according to your plan, consider taking profits.", completed: false, defaultPrompt: "Caddie, can you provide some best practices for managing active trades, especially regarding stop-losses and profit-taking?" },
  { id: "mr6", text: "Log New Trades", details: "Record details of any new trades taken (entry price, size, stop-loss, rationale).", completed: false, defaultPrompt: "Caddie, what are the most crucial details to include when logging a new trade for effective post-market review?" },
  { id: "mr7", text: "Stay Aware of News/Events", details: "Keep an eye on any breaking news or economic releases that could impact the market or your positions.", completed: false, defaultPrompt: "Caddie, what are reliable sources or methods for staying aware of market-moving news and events during the trading day?" },
  { id: "mr8", text: "Maintain Trading Psychology", details: "Stick to your trading plan, avoid emotional decisions, take breaks if needed.", completed: false, defaultPrompt: "Caddie, what are some practical tips for maintaining good trading psychology and avoiding emotional decisions when the market is active?" },
];

const MarketPage = () => {
  const [tradeIdeaType, setTradeIdeaType] = useState<"All" | "Stock" | "Option">("All");
  const [tradeSecurityInput, setTradeSecurityInput] = useState("");
  const [loggedTrades, setLoggedTrades] = useState<LoggedTrade[]>(mockLoggedTrades);
  const [newTrade, setNewTrade] = useState({ security: "", type: "Buy", entryPrice: "", quantity: "" });
  const [marketRoutine, setMarketRoutine] = useState<MarketRoutineItem[]>(initialMarketRoutine);
  const [aiCommentary, setAiCommentary] = useState<string | null>(null);
  const [lastCommentaryFetchTime, setLastCommentaryFetchTime] = useState<number>(0);

  const [chatKey, setChatKey] = useState(`market-general-${Date.now()}`);
  const [initialMessageForAI, setInitialMessageForAI] = useState<string | undefined>("Welcome to Market Central! I'm your Trade Caddie, powered by live AI. The market is open! How can I assist you? We can look for trade ideas, discuss market sentiment, or log your trades.");
  const [isChatReady, setIsChatReady] = useState(false);

  useEffect(() => {
    setIsChatReady(true);
  }, []);

  const fetchAiCommentary = useCallback(async () => {
    console.log("Attempting to fetch AI commentary...");
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            { role: "user", content: "Provide a brief, relevant market insight or tip for a day trader who is currently in their market session. Keep it concise (1-2 sentences)." }
          ]
        }),
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: `AI commentary request failed with status ${response.status}` }));
        throw new Error(errorData.error || `AI commentary request failed with status ${response.status}`);
      }
      // The response from /api/chat is now a stream for the main chat, 
      // but for commentary, we expect a single JSON object from the Flask API if we hit it directly,
      // or a streamed single response if going via the Next.js API route that now wraps it.
      // Let's assume the Next.js API route correctly decodes the stream for us if it's a single message.
      const reader = response.body?.getReader();
      if (!reader) throw new Error("Response body is null for commentary");
      const decoder = new TextDecoder();
      let accumulatedResponse = "";
      const { done, value } = await reader.read();
      if (value) {
        accumulatedResponse = decoder.decode(value, { stream: false });
      }
      
      // Attempt to parse the accumulated response as JSON, as the Flask endpoint returns JSON.
      // However, our Next.js /api/chat route is now set up to return a text stream.
      // For simplicity in this non-streaming context, we'll assume the full text is the commentary.
      // If the Flask API returns { "response": "..." }, and Next API streams it, this will be the direct text.
      if (accumulatedResponse) {
        setAiCommentary(accumulatedResponse);
        setLastCommentaryFetchTime(Date.now());
        console.log("AI Commentary fetched: ", accumulatedResponse);
      } else {
        console.error("Error in AI commentary response: Empty response");
        setAiCommentary("Caddie is thinking... (No commentary received)");
      }

    } catch (error) {
      console.error("Failed to fetch AI commentary:", error);
      let errorMessage = "Could not fetch market commentary at this time.";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      setAiCommentary(errorMessage);
    }
  }, []);

  useEffect(() => {
    const commentaryInterval = 30 * 60 * 1000; // 30 minutes
    if (Date.now() - lastCommentaryFetchTime > commentaryInterval || !aiCommentary) {
        fetchAiCommentary();
    }
    const timerId = setInterval(() => {
        fetchAiCommentary();
    }, commentaryInterval);
    return () => clearInterval(timerId);
  }, [fetchAiCommentary, lastCommentaryFetchTime, aiCommentary]);

  const handleLogTrade = () => {
    if (newTrade.security && newTrade.entryPrice && newTrade.quantity) {
      const newEntry: LoggedTrade = {
        id: `t${Date.now()}`,
        security: newTrade.security,
        type: newTrade.type,
        entryPrice: parseFloat(newTrade.entryPrice),
        quantity: parseInt(newTrade.quantity),
        status: "Open",
        currentPrice: parseFloat(newTrade.entryPrice),
        pnl: 0.00
      };
      setLoggedTrades(prevTrades => [newEntry, ...prevTrades]);
      setNewTrade({ security: "", type: "Buy", entryPrice: "", quantity: "" });

      const logContextPrompt = `I've just logged a trade: ${newEntry.quantity} of ${newEntry.security} (${newEntry.type}) at $${newEntry.entryPrice}. What are your initial thoughts on this trade given the current market? Or what should I be mindful of?`;
      setInitialMessageForAI(logContextPrompt);
      setChatKey(`market-log-trade-${newEntry.id}-${Date.now()}`);
    }
  };

  const filteredTradeIdeas = mockTradeIdeas.filter(idea =>
    (tradeIdeaType === "All" || idea.type === tradeIdeaType) &&
    (tradeSecurityInput === "" || idea.security.toLowerCase().includes(tradeSecurityInput.toLowerCase()))
  );

  const handleTradeIdeaDiscuss = (idea: TradeIdea) => {
    const discussContextPrompt = `Let's discuss this trade idea: ${idea.type} for ${idea.security} - "${idea.idea}". The rationale is: "${idea.rationale || 'N/A'}". What are your detailed thoughts on this, including potential risks, rewards, and entry/exit strategies?`;
    setInitialMessageForAI(discussContextPrompt);
    setChatKey(`market-discuss-idea-${idea.id}-${Date.now()}`);
  };

  const handleGeneralMarketQuery = () => {
    setInitialMessageForAI("What's your current take on the overall market sentiment today? Any key levels or news events I should be aware of for major indices like SPY or QQQ?");
    setChatKey(`market-general-query-${Date.now()}`);
  };

  const handleRoutineItemToggle = (itemId: string) => {
    setMarketRoutine(prevRoutine =>
      prevRoutine.map(item =>
        item.id === itemId ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const handleAskCaddieForRoutine = (prompt: string) => {
    setInitialMessageForAI(prompt);
    setChatKey(`market-routine-${Date.now()}`);
  };

  return (
    <div className="container mx-auto py-6 px-4 md:py-8 space-y-8 text-foreground">
      <Card className="shadow-xl hover:shadow-2xl transition-shadow duration-300 bg-card border border-border rounded-lg">
        <CardHeader className="pb-4 border-b border-border">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-primary/10 rounded-lg">
                <TrendingUp size={28} className="text-primary"/>
            </div>
            <div>
                <CardTitle className="text-2xl sm:text-3xl font-semibold text-primary">Trade Caddie: Market Central</CardTitle>
                <CardDescription className="text-muted-foreground mt-1">
                    Your AI partner for live market action, trade ideas, and in-market guidance. Let's navigate together!
                </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
            <div className="grid lg:grid-cols-3 gap-6">
                {/* Left Column: Chart, Trade Journal, and In-Market Routine */}
                <div className="lg:col-span-2 space-y-6">
                    <Card className="bg-background/70 border border-border rounded-lg">
                        <CardHeader className="pb-3 border-b border-border">
                            <CardTitle className="text-xl font-medium flex items-center text-primary"><CandlestickChart size={24} className="mr-2 text-primary"/>Live Market Chart</CardTitle>
                            <CardDescription className="text-muted-foreground mt-1">Real-time price action. (TradingView Integration Pending)</CardDescription>
                        </CardHeader>
                        <CardContent className="p-4">
                            <TradingViewChartPlaceholder />
                        </CardContent>
                    </Card>

                    <Card className="bg-background/70 border border-border rounded-lg">
                        <CardHeader className="pb-3 border-b border-border">
                            <CardTitle className="text-xl font-medium flex items-center text-primary"><ListChecks size={22} className="mr-2 text-primary"/>In-Market Routine</CardTitle>
                            <CardDescription className="text-muted-foreground mt-1">Your checklist for navigating the active market session.</CardDescription>
                        </CardHeader>
                        <CardContent className="p-4 space-y-3">
                            {marketRoutine.map(item => (
                                <div key={item.id} className="flex items-start space-x-3 p-3 bg-muted/20 rounded-md border border-border/50">
                                    <Checkbox 
                                        id={`routine-${item.id}`} 
                                        checked={item.completed} 
                                        onCheckedChange={() => handleRoutineItemToggle(item.id)}
                                        className="mt-1 border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                                    />
                                    <div className="flex-grow">
                                        <label htmlFor={`routine-${item.id}`} className={`font-medium text-foreground ${item.completed ? 'line-through text-muted-foreground' : ''}`}>{item.text}</label>
                                        <p className={`text-xs text-muted-foreground ${item.completed ? 'line-through' : ''}`}>{item.details}</p>
                                    </div>
                                    <Button variant="outline" size="sm" onClick={() => handleAskCaddieForRoutine(item.defaultPrompt)} className="ml-auto text-primary border-primary hover:bg-primary/10">Ask Caddie</Button>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                    
                    {aiCommentary && (
                        <Card className="bg-background/70 border-primary/50 rounded-lg border-l-4">
                            <CardHeader className="pb-2 pt-3">
                                <CardTitle className="text-lg font-medium flex items-center text-primary"><Info size={20} className="mr-2"/>Caddie's Market Pulse</CardTitle>
                            </CardHeader>
                            <CardContent className="pb-3 pt-0">
                                <p className="text-sm text-foreground">{aiCommentary}</p>
                            </CardContent>
                        </Card>
                    )}

                    <Card className="bg-background/70 border border-border rounded-lg">
                        <CardHeader className="pb-3 border-b border-border">
                            <CardTitle className="text-xl font-medium flex items-center text-primary"><Edit3 size={22} className="mr-2 text-primary"/>Your Trade Journal</CardTitle>
                            <CardDescription className="text-muted-foreground mt-1">Log your trades. Your Caddie will help analyze them post-market.</CardDescription>
                        </CardHeader>
                        <CardContent className="p-4">
                            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4 items-end">
                                <Input placeholder="Symbol" value={newTrade.security} onChange={(e) => setNewTrade({...newTrade, security: e.target.value.toUpperCase()})} className="bg-input text-foreground placeholder:text-muted-foreground rounded-md" />
                                <Select value={newTrade.type} onValueChange={(value) => setNewTrade({...newTrade, type: value})}>
                                    <SelectTrigger className="bg-input text-foreground rounded-md"><SelectValue placeholder="Type" /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Buy">Buy</SelectItem>
                                        <SelectItem value="Sell">Sell Short</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Input type="number" placeholder="Entry Price" value={newTrade.entryPrice} onChange={(e) => setNewTrade({...newTrade, entryPrice: e.target.value})} className="bg-input text-foreground placeholder:text-muted-foreground rounded-md" />
                                <Input type="number" placeholder="Quantity" value={newTrade.quantity} onChange={(e) => setNewTrade({...newTrade, quantity: e.target.value})} className="bg-input text-foreground placeholder:text-muted-foreground rounded-md" />
                                <Button onClick={handleLogTrade} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-md">Log Trade</Button>
                            </div>
                            {loggedTrades.length > 0 && (
                                <ScrollArea className="h-[200px] w-full rounded-md border border-border p-2">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead className="text-primary">Symbol</TableHead>
                                                <TableHead className="text-primary">Type</TableHead>
                                                <TableHead className="text-primary text-right">Entry</TableHead>
                                                <TableHead className="text-primary text-right">Qty</TableHead>
                                                <TableHead className="text-primary">Status</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {loggedTrades.map(trade => (
                                                <TableRow key={trade.id}>
                                                    <TableCell className="font-medium">{trade.security}</TableCell>
                                                    <TableCell>{trade.type}</TableCell>
                                                    <TableCell className="text-right">${trade.entryPrice.toFixed(2)}</TableCell>
                                                    <TableCell className="text-right">{trade.quantity}</TableCell>
                                                    <TableCell><Badge variant={trade.status === "Open" ? "default" : "secondary"}>{trade.status}</Badge></TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </ScrollArea>
                            )}
                            {loggedTrades.length === 0 && (
                                <p className="text-sm text-muted-foreground text-center py-4">No trades logged yet for this session.</p>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column: AI Chat Bot and Trade Ideas */}
                <div className="lg:col-span-1 space-y-6 h-full flex flex-col">
                    {isChatReady && (
                        <div className="flex-grow flex flex-col min-h-[400px] h-[calc(100vh-var(--bottom-nav-height)-var(--global-header-height)-10rem)] md:h-auto">
                            <AIChatBot 
                                conversationId={chatKey} 
                                initialMessage={initialMessageForAI} 
                                key={chatKey} 
                            />
                        </div>
                    )}
                    <Card className="bg-background/70 border border-border rounded-lg">
                        <CardHeader className="pb-3 border-b border-border">
                            <CardTitle className="text-xl font-medium flex items-center text-primary"><Zap size={22} className="mr-2 text-primary"/>Caddie's Trade Ideas</CardTitle>
                            <CardDescription className="text-muted-foreground mt-1">AI-generated trade ideas. Always do your own research.</CardDescription>
                        </CardHeader>
                        <CardContent className="p-4 space-y-4">
                            <div className="flex flex-col sm:flex-row gap-2 items-center">
                                <ToggleGroup type="single" defaultValue="All" value={tradeIdeaType} onValueChange={(value: "All" | "Stock" | "Option") => value && setTradeIdeaType(value)} className="w-full sm:w-auto">
                                    <ToggleGroupItem value="All" aria-label="All ideas" className="flex-1 sm:flex-initial data-[state=on]:bg-primary data-[state=on]:text-primary-foreground">All</ToggleGroupItem>
                                    <ToggleGroupItem value="Stock" aria-label="Stock ideas" className="flex-1 sm:flex-initial data-[state=on]:bg-primary data-[state=on]:text-primary-foreground">Stocks</ToggleGroupItem>
                                    <ToggleGroupItem value="Option" aria-label="Option ideas" className="flex-1 sm:flex-initial data-[state=on]:bg-primary data-[state=on]:text-primary-foreground">Options</ToggleGroupItem>
                                </ToggleGroup>
                                <Input 
                                    type="text" 
                                    placeholder="Filter by symbol..."
                                    value={tradeSecurityInput}
                                    onChange={(e) => setTradeSecurityInput(e.target.value)}
                                    className="bg-input text-foreground placeholder:text-muted-foreground rounded-md w-full sm:w-auto flex-grow"
                                />
                            </div>
                            <ScrollArea className="h-[200px] w-full rounded-md border border-border p-2">
                                {filteredTradeIdeas.length > 0 ? filteredTradeIdeas.map(idea => (
                                    <div key={idea.id} className="p-3 mb-2 rounded-md bg-muted/20 border border-border/50 hover:bg-muted/40 transition-colors">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h4 className="font-semibold text-foreground">{idea.security} <Badge variant={idea.type === "Stock" ? "secondary" : "outline"} className="ml-1">{idea.type}</Badge></h4>
                                                <p className="text-sm text-muted-foreground mt-0.5">{idea.idea}</p>
                                                {idea.rationale && <p className="text-xs text-muted-foreground/70 mt-0.5">Rationale: {idea.rationale}</p>}
                                            </div>
                                            <Button variant="ghost" size="sm" onClick={() => handleTradeIdeaDiscuss(idea)} className="text-primary hover:bg-primary/10 text-xs p-1 h-auto">Discuss</Button>
                                        </div>
                                        <div className="flex justify-between items-center mt-1.5">
                                            <p className="text-xs text-muted-foreground/70">Source: {idea.source} | {idea.timestamp}</p>
                                            {idea.urgency && <Badge variant={idea.urgency === "High" ? "destructive" : (idea.urgency === "Medium" ? "warning" : "default")} className="text-xs">{idea.urgency}</Badge>}
                                        </div>
                                    </div>
                                )) : (
                                    <p className="text-sm text-muted-foreground text-center py-4">No trade ideas match your filters.</p>
                                )}
                            </ScrollArea>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MarketPage;

