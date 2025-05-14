"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Crown } from 'lucide-react'; // Corrected import
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Mocked data for Leaderboard Tab
const mockLeaderboardData = [
  { user: "AlphaTraderX", pnl: 1250.75, avgGain: 75.20, avgLoss: -30.10, trades: 25, winRate: 0.72, avatarFallback: "AT", specialBadge: "Top Performer" },
  { user: "MockUser", pnl: 980.50, avgGain: 55.00, avgLoss: -25.50, trades: 30, winRate: 0.65, avatarFallback: "MU", specialBadge: "Consistent Earner" },
  { user: "ScalperQueen", pnl: 850.00, avgGain: 25.15, avgLoss: -10.00, trades: 150, winRate: 0.80, avatarFallback: "SQ", specialBadge: "High Volume" },
  { user: "SwingKing", pnl: 700.20, avgGain: 150.00, avgLoss: -70.80, trades: 10, winRate: 0.60, avatarFallback: "SK" },
  { user: "OptionOracle", pnl: 650.90, avgGain: 200.00, avgLoss: -90.00, trades: 8, winRate: 0.55, avatarFallback: "OO" },
  { user: "DayTraderDan", pnl: 500.00, avgGain: 40.00, avgLoss: -20.00, trades: 40, winRate: 0.60, avatarFallback: "DD" },
  { user: "CryptoKid", pnl: 450.60, avgGain: 100.00, avgLoss: -50.00, trades: 12, winRate: 0.50, avatarFallback: "CK" },
  { user: "SteadyEddie", pnl: 300.00, avgGain: 30.00, avgLoss: -15.00, trades: 20, winRate: 0.66, avatarFallback: "SE" },
  { user: "RiskAverseRita", pnl: 150.00, avgGain: 50.00, avgLoss: -10.00, trades: 5, winRate: 0.80, avatarFallback: "RR", specialBadge: "Low Risk" },
  { user: "NewbieNick", pnl: 50.25, avgGain: 15.00, avgLoss: -5.00, trades: 7, winRate: 0.57, avatarFallback: "NN" },
];

const LeaderboardPage = () => {
  const currentUser = "MockUser"; // To highlight the current user
  const [timeFilter, setTimeFilter] = React.useState("weekly"); // daily, weekly, monthly, all-time

  const displayedData = React.useMemo(() => {
    return mockLeaderboardData
      .slice()
      .sort((a, b) => b.pnl - a.pnl)
      .map((user, index) => ({ ...user, rank: index + 1 }));
  }, [timeFilter]);

  const getRankColor = (rank: number) => {
    if (rank === 1) return "text-yellow-400 dark:text-yellow-300";
    if (rank === 2) return "text-gray-400 dark:text-gray-300";
    if (rank === 3) return "text-orange-400 dark:text-orange-300";
    return "text-foreground";
  };

  // Since this page is disabled, we can return a simple placeholder or null
  // to avoid any rendering issues if it's somehow accessed.
  // Or, ideally, the routing should prevent access to this page entirely.
  return (
    <div className="container mx-auto py-4 px-2 sm:px-4 md:py-6 space-y-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground text-center sm:text-left">Leaderboard (Currently Disabled)</h1>
        <p className="text-muted-foreground text-center">This feature is currently disabled and will be re-evaluated for future integration.</p>
    </div>
  );

  /* Original content commented out as the page is disabled
  return (
    <div className="container mx-auto py-4 px-2 sm:px-4 md:py-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground text-center sm:text-left">Community Rankings</h1>
        <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Period:</span>
            <Select value={timeFilter} onValueChange={setTimeFilter}>
                <SelectTrigger className="w-[130px] bg-input text-foreground">
                    <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="all-time">All Time</SelectItem>
                </SelectContent>
            </Select>
        </div>
      </div>

      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl sm:text-2xl flex items-center"><Crown size={26} className="mr-2 text-primary"/>Top Performing Traders</CardTitle>
          <CardDescription>See how you stack up against the Trade Mentor AI community.</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[calc(100vh-280px)] sm:h-[calc(100vh-260px)]">
            <Table>
              <TableHeader className="sticky top-0 bg-background/95 backdrop-blur-sm z-10">
                <TableRow>
                  <TableHead className="w-[60px] text-center">Rank</TableHead>
                  <TableHead>Trader</TableHead>
                  <TableHead className="text-right">Total P&L</TableHead>
                  <TableHead className="text-right hidden md:table-cell">Avg. Gain</TableHead>
                  <TableHead className="text-right hidden md:table-cell">Avg. Loss</TableHead>
                  <TableHead className="text-right hidden sm:table-cell">Trades</TableHead>
                  <TableHead className="text-right hidden sm:table-cell">Win Rate</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {displayedData.map((trader) => (
                  <TableRow key={trader.user} className={`${trader.user === currentUser ? "bg-primary/10 border-l-4 border-primary" : "hover:bg-accent/30 transition-colors"} ${trader.rank <=3 ? "font-semibold" : ""}`}>
                    <TableCell className={`text-center font-bold text-lg ${getRankColor(trader.rank)}`}>
                        {trader.rank === 1 && <Crown size={18} className="inline-block mb-1 text-yellow-400 dark:text-yellow-300" />}
                        {trader.rank > 1 ? trader.rank : ""}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar className={`h-9 w-9 sm:h-10 sm:w-10 border-2 ${trader.user === currentUser ? "border-primary" : "border-transparent"}`}>
                          <AvatarFallback className="text-xs sm:text-sm">{trader.avatarFallback || trader.user.substring(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                            <span className={`font-medium ${trader.user === currentUser ? "text-primary" : "text-foreground"}`}>{trader.user}</span>
                            {trader.specialBadge && <Badge variant="secondary" className="text-xs w-fit mt-0.5">{trader.specialBadge}</Badge>}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className={`text-right font-bold text-base ${trader.pnl >= 0 ? "text-green-500 dark:text-green-400" : "text-red-500 dark:text-red-400"}`}>{trader.pnl >=0 ? `+$${trader.pnl.toFixed(2)}` : `-$${Math.abs(trader.pnl).toFixed(2)}`}</TableCell>
                    <TableCell className="text-right hidden md:table-cell text-green-500 dark:text-green-400">+${trader.avgGain.toFixed(2)}</TableCell>
                    <TableCell className="text-right hidden md:table-cell text-red-500 dark:text-red-400">-${Math.abs(trader.avgLoss).toFixed(2)}</TableCell>
                    <TableCell className="text-right hidden sm:table-cell">{trader.trades}</TableCell>
                    <TableCell className="text-right hidden sm:table-cell">{(trader.winRate * 100).toFixed(0)}%</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {displayedData.length === 0 && <p className="text-sm text-muted-foreground text-center py-10">No leaderboard data available for this period.</p>}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
  */
};

export default LeaderboardPage;

