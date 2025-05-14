"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ThumbsUp, MessageSquare as MessageSquareIcon, Share2, Send, Users2, Crown, Sparkles, Search, Filter } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import AIChatBot from "@/components/ai/AIChatBot";
import ThemeAwareLogo from '@/components/ui/ThemeAwareLogo';

interface CommunityPostComment {
  id: string;
  user: string;
  avatarFallback: string;
  avatarImage?: string;
  comment: string;
  timestamp: string;
}

interface CommunityPost {
  id: string;
  user: string;
  avatarFallback: string;
  avatarImage?: string;
  timestamp: string;
  content: string;
  likes: number;
  comments: CommunityPostComment[];
  tags?: string[];
}

const mockCommunityPosts: CommunityPost[] = [
  {
    id: "post1",
    user: "AlphaTraderX",
    avatarFallback: "AT",
    timestamp: "2 hours ago",
    content: "Nailed that NVDA breakout this morning! Rode it for a quick +$150. The AI signals for increased volume were spot on. Anyone else catch it?",
    likes: 27,
    comments: [
      { id: "c1-1", user: "ScalperQueen", avatarFallback: "SQ", comment: "I did! Small size but a clean scalp. Thanks for the heads up on volume!", timestamp: "1 hour ago" },
      { id: "c1-2", user: "MockUser", avatarFallback: "MU", comment: "Awesome trade! I was watching it but was a bit hesitant to jump in. Regretting it now!", timestamp: "30 mins ago" },
    ],
    tags: ["NVDA", "Breakout", "DayTrading"]
  },
  {
    id: "post2",
    user: "OptionOracle",
    avatarFallback: "OO",
    timestamp: "5 hours ago",
    content: "Considering a short-term SPY put spread for a potential pullback. IV is still relatively low. What are your thoughts on market direction for the next few days?",
    likes: 12,
    comments: [
        { id: "c2-1", user: "SwingKing", avatarFallback: "SK", comment: "I'm leaning bullish but cautious. A small hedge might not be a bad idea.", timestamp: "4 hours ago" },
    ],
    tags: ["SPY", "Options", "Strategy"]
  },
  {
    id: "post3",
    user: "Trade Caddie",
    avatarFallback: "TC",
    avatarImage: "/trade_caddie_logo_default_white_bg.png", 
    timestamp: "6 hours ago",
    content: "Hey community! Quick tip from your Trade Caddie: Remember to review your trades from yesterday. What was your biggest lesson? Sharing helps everyone learn! #TradingTips #LearnAndGrow",
    likes: 45,
    comments: [],
    tags: ["Tips", "Education"]
  },
];

const mockLeaderboardData = [
  { rank: 1, user: "AlphaTraderX", pnl: 1250.75, winRate: "68%", trades: 25, avatarFallback: "AT" },
  { rank: 2, user: "ScalperQueen", pnl: 980.20, winRate: "75%", trades: 40, avatarFallback: "SQ" },
  { rank: 3, user: "OptionOracle", pnl: 750.00, winRate: "55%", trades: 18, avatarFallback: "OO" },
  { rank: 4, user: "MockUser", pnl: 450.50, winRate: "60%", trades: 12, avatarFallback: "MU" }, 
  { rank: 5, user: "SwingKing", pnl: 300.00, winRate: "58%", trades: 22, avatarFallback: "SK" },
];

const CommunityPage = () => {
  const [posts, setPosts] = useState<CommunityPost[]>(mockCommunityPosts);
  const [newPostContent, setNewPostContent] = useState("");
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [chatKey, setChatKey] = useState(`community-general-${Date.now()}`);
  const [initialMessageForAI, setInitialMessageForAI] = useState<string | undefined>("Welcome to the Trade Caddie Community Hub! This is your space to connect, share strategies, and learn from fellow traders. I'm here to help facilitate discussions and highlight interesting insights. What are you looking to explore today? Perhaps check out the latest posts or see who's topping the Leaderboard?");
  const [isChatReady, setIsChatReady] = useState(false);

  useEffect(() => {
    setIsChatReady(true);
  }, []);

  const handleCreatePost = () => {
    if (newPostContent.trim() !== "") {
      const newPost: CommunityPost = {
        id: `post${posts.length + Math.random()}`,
        user: "CurrentTrader", 
        avatarFallback: "CT",
        timestamp: "Just now",
        content: newPostContent,
        likes: 0,
        comments: [],
        tags: newPostContent.match(/#\w+/g) || []
      };
      setPosts([newPost, ...posts]);
      setNewPostContent("");
      setInitialMessageForAI(`Great post! It's now live in the feed. I've also noted the tags: ${newPost.tags?.join(', ') || 'None'}. This helps others find relevant content. What topic should we explore next in the community, or perhaps you'd like to comment on another post?`);
      setChatKey(`community-post-created-${Date.now()}`);
    }
  };

  const handleAddComment = (postId: string) => {
    if (replyContent.trim() === "") return;
    setPosts(posts.map(p => p.id === postId ? { ...p, comments: [...p.comments, {id: `c${Math.random()}`, user: "CurrentTrader", avatarFallback: "CT", comment: replyContent, timestamp: "Just now"}] } : p));
    setReplyContent("");
    setReplyingTo(null);
    setInitialMessageForAI(`Your reply has been added. Engaging with others is a fantastic way to deepen your understanding and build connections! What other posts are catching your eye, or would you like to discuss a specific community member's contributions?`);
    setChatKey(`community-reply-added-${Date.now()}`);
  };

  const handlePostFocus = (post: CommunityPost) => {
    setInitialMessageForAI(`Let's talk about this post by ${post.user}: "${post.content.substring(0, 100)}...". What are your thoughts on this, or would you like me to summarize the key points or related discussions?`);
    setChatKey(`community-post-focus-${post.id}-${Date.now()}`);
  };

  const handleLeaderboardFocus = () => {
    setInitialMessageForAI("Tell me more about the leaderboard. How is P&L calculated? Is it based on simulated trades logged in the app? What are the criteria for appearing here? Or perhaps you'd like to know more about a specific user on the leaderboard?");
    setChatKey(`community-leaderboard-focus-${Date.now()}`);
  };

  const filteredPosts = posts.filter(post => 
    post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (post.tags && post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
  );

  return (
    <div className="container mx-auto py-4 px-2 sm:px-4 md:py-6 space-y-6 text-foreground">
      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card">
        <CardHeader className="pb-4">
            <div className="flex items-center space-x-3">
                <Users2 size={32} className="text-primary"/>
                <CardTitle className="text-2xl sm:text-3xl text-primary">Trade Caddie: Community Connect</CardTitle>
            </div>
            <CardDescription className="text-muted-foreground">
                Share insights, discuss strategies, and learn with fellow traders. Your Trade Caddie is here to facilitate and guide conversations.
            </CardDescription>
        </CardHeader>
        <CardContent>
            <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1 space-y-6">
                    <Card className="bg-background/70 h-auto flex flex-col">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-xl text-primary flex items-center"><MessageSquareIcon size={22} className="mr-2"/>Caddie's Community Corner</CardTitle>
                            <CardDescription className="text-muted-foreground">I can help find discussions, summarize topics, or suggest who to follow.</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-grow">
                        {isChatReady && (
                            <AIChatBot 
                                key={chatKey}
                                conversationId={chatKey}
                                initialMessage={initialMessageForAI}
                                aiPersonaName="Trade Caddie (Community)"
                                aiPersonaImageComponent ={
                                    <ThemeAwareLogo 
                                        alt="Trade Caddie AI Persona" 
                                        width={40} 
                                        height={40} 
                                        className="rounded-full object-contain mr-2"
                                    />
                                }
                                showUserInput={true}
                                containerClassName="h-[250px] sm:h-[300px]"
                            />
                        )}
                        </CardContent>
                    </Card>
                    <Card className="bg-background/70">
                        <CardHeader className="pb-2">
                            <div className="flex items-center space-x-2">
                                <Crown size={22} className="text-primary" />
                                <CardTitle className="text-xl text-primary">Community Leaderboard</CardTitle>
                            </div>
                            <CardDescription className="text-muted-foreground">Top Caddie users by performance. (Mock Data)</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ScrollArea className="h-[220px]">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="border-border">
                                        <TableHead className="w-[40px] text-foreground text-center">Rank</TableHead>
                                        <TableHead className="text-foreground">User</TableHead>
                                        <TableHead className="text-right text-foreground">P&L ($)</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {mockLeaderboardData.map((trader) => (
                                        <TableRow key={trader.rank} className="hover:bg-accent/30 transition-colors border-border">
                                            <TableCell className="font-medium text-center text-foreground">{trader.rank === 1 ? <Crown size={16} className="mx-auto text-yellow-500"/> : trader.rank}</TableCell>
                                            <TableCell>
                                                <div className="flex items-center space-x-2">
                                                    <Avatar className="h-6 w-6"><AvatarImage src={`https://avatar.vercel.sh/${trader.user.replace(" ", "")}.png?size=24`} /><AvatarFallback className="text-xs bg-muted text-muted-foreground">{trader.avatarFallback}</AvatarFallback></Avatar>
                                                    <span className="text-sm font-medium text-foreground">{trader.user}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell className={`text-right font-semibold text-sm ${trader.pnl >= 0 ? 'text-green-500 dark:text-green-400' : 'text-red-500 dark:text-red-400'}`}>{trader.pnl >=0 ? `+${trader.pnl.toFixed(2)}` : `-${Math.abs(trader.pnl).toFixed(2)}`}</TableCell>
                                        </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </ScrollArea>
                            <Button variant="link" className="text-xs mt-2 p-0 h-auto text-primary hover:text-primary/80" onClick={handleLeaderboardFocus}>Learn more about Leaderboard</Button>
                        </CardContent>
                    </Card>
                </div>

                <div className="lg:col-span-2 space-y-6">
                    <Card className="bg-background/70">
                        <CardHeader className="pb-2">
                        <CardTitle className="text-xl text-primary flex items-center"><Sparkles size={22} className="mr-2"/>Share Your Insights</CardTitle>
                        <CardDescription className="text-muted-foreground">Post trade ideas, questions, or market observations. Use #hashtags to categorize!</CardDescription>
                        </CardHeader>
                        <CardContent>
                        <Textarea 
                            placeholder="What's on your mind, CurrentTrader? Your Caddie encourages sharing! (e.g., #SPY #Question #Strategy)"
                            value={newPostContent}
                            onChange={(e) => setNewPostContent(e.target.value)}
                            className="mb-3 min-h-[90px] bg-input text-foreground placeholder:text-muted-foreground"
                        />
                        <Button onClick={handleCreatePost} size="md" className="bg-primary hover:bg-primary/90 text-primary-foreground"><Send size={16} className="mr-2"/>Post to Community</Button>
                        </CardContent>
                    </Card>

                    <div className="pt-4 border-t border-border">
                        <div className="flex flex-col sm:flex-row justify-between items-center mb-3">
                            <h2 className="text-xl font-semibold text-primary mb-2 sm:mb-0">Community Feed</h2>
                            <div className="flex items-center space-x-2 w-full sm:w-auto">
                                <Input 
                                    type="text"
                                    placeholder="Search posts, users, #tags..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="bg-input text-foreground placeholder:text-muted-foreground w-full sm:w-auto"
                                />
                                {/* <Button variant="outline" size="icon" className="border-border"><Filter size={18}/></Button> */}
                            </div>
                        </div>
                        <ScrollArea className="h-[500px] pr-3">
                        {filteredPosts.length > 0 ? filteredPosts.map(post => (
                            <Card key={post.id} className="mb-4 bg-card shadow-sm hover:shadow-md transition-shadow duration-200">
                            <CardHeader className="pb-2 pt-3 px-4">
                                <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <Avatar className="h-9 w-9">
                                    {post.user === "Trade Caddie" ? 
                                        <ThemeAwareLogo alt="Trade Caddie Logo" width={36} height={36} className="rounded-full object-contain" /> : 
                                        <><AvatarImage src={post.avatarImage || `https://avatar.vercel.sh/${post.user.replace(" ", "")}.png?size=36`} /><AvatarFallback className="bg-muted text-muted-foreground">{post.avatarFallback}</AvatarFallback></>
                                    }
                                    </Avatar>
                                    <div>
                                    <p className="font-semibold text-sm text-foreground">{post.user}</p>
                                    <p className="text-xs text-muted-foreground">{post.timestamp}</p>
                                    </div>
                                </div>
                                {/* Add options like report/follow later */}
                                </div>
                            </CardHeader>
                            <CardContent className="px-4 pb-3">
                                <p className="text-sm text-foreground whitespace-pre-wrap mb-2" onClick={() => handlePostFocus(post)}>{post.content}</p>
                                {post.tags && post.tags.length > 0 && (
                                    <div className="flex flex-wrap gap-1 mb-2">
                                        {post.tags.map(tag => <Badge key={tag} variant="secondary" className="text-xs bg-primary/10 text-primary hover:bg-primary/20 cursor-pointer" onClick={() => setSearchTerm(tag)}>{tag}</Badge>)}
                                    </div>
                                )}
                                <div className="flex items-center space-x-4 text-muted-foreground">
                                <Button variant="ghost" size="sm" className="p-1 h-auto text-xs hover:text-primary hover:bg-primary/10"><ThumbsUp size={14} className="mr-1" /> {post.likes}</Button>
                                <Button variant="ghost" size="sm" className="p-1 h-auto text-xs hover:text-primary hover:bg-primary/10" onClick={() => setReplyingTo(replyingTo === post.id ? null : post.id)}><MessageSquareIcon size={14} className="mr-1" /> {post.comments.length} Comment{post.comments.length !== 1 ? 's' : ''}</Button>
                                <Button variant="ghost" size="sm" className="p-1 h-auto text-xs hover:text-primary hover:bg-primary/10"><Share2 size={14} className="mr-1" /> Share</Button>
                                </div>
                                {replyingTo === post.id && (
                                <div className="mt-3">
                                    <Textarea 
                                        placeholder={`Reply to ${post.user}...`}
                                        value={replyContent}
                                        onChange={(e) => setReplyContent(e.target.value)}
                                        className="mb-2 min-h-[60px] bg-input text-foreground placeholder:text-muted-foreground"
                                    />
                                    <Button size="sm" onClick={() => handleAddComment(post.id)} className="bg-primary hover:bg-primary/90 text-primary-foreground">Send Reply</Button>
                                </div>
                                )}
                                {post.comments.length > 0 && (
                                <div className="mt-3 space-y-2 pt-2 border-t border-border/50">
                                    {post.comments.map(comment => (
                                    <div key={comment.id} className="flex items-start space-x-2">
                                        <Avatar className="h-7 w-7 mt-0.5">
                                            <AvatarImage src={comment.avatarImage || `https://avatar.vercel.sh/${comment.user.replace(" ", "")}.png?size=28`} />
                                            <AvatarFallback className="text-xs bg-muted text-muted-foreground">{comment.avatarFallback}</AvatarFallback>
                                        </Avatar>
                                        <div className="bg-muted/50 p-2 rounded-md w-full">
                                        <div className="flex items-center justify-between">
                                            <p className="font-semibold text-xs text-foreground">{comment.user}</p>
                                            <p className="text-xs text-muted-foreground">{comment.timestamp}</p>
                                        </div>
                                        <p className="text-sm text-foreground whitespace-pre-wrap">{comment.comment}</p>
                                        </div>
                                    </div>
                                    ))}
                                </div>
                                )}
                            </CardContent>
                            </Card>
                        )) : <p className="text-center text-muted-foreground py-8">No posts match your search. Try broadening your terms or check back later!</p>}
                        </ScrollArea>
                    </div>
                </div>
            </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CommunityPage;

