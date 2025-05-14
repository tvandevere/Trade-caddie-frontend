"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AIChatBot from '@/components/ai/AIChatBot';
import { BookText, Film, MessageSquareHeart } from 'lucide-react'; // Icons for recommendations

// Mocked data for Post-Market Tab
const mockMentorConversation = [
  "AI Mentor: Hi MockUser, welcome to your post-market review. How do you feel about your trading performance today?",
  "MockUser: Mixed feelings. I had a good win on NVDA but took a frustrating loss on SPY options right before the close.",
  "AI Mentor: I understand. Let's break down that SPY trade. What was your thesis, entry, and what happened?",
  "MockUser: I thought the market was overextended and bought some puts. It just kept grinding higher.",
  "AI Mentor: Ah, fighting the trend can be tough. Did you have a clear invalidation point for that trade, or was it more of a gut feeling? Sometimes, especially in strong trends, waiting for clearer confirmation of a reversal is key. For the NVDA trade, great job identifying the momentum and riding it! What went well there?",
  "MockUser: For NVDA, I saw the volume come in on the breakout and got in. My stop was clear below the breakout level.",
  "AI Mentor: Excellent. That's a solid mechanical entry and risk management. For tomorrow, perhaps we can focus on identifying high-probability reversal setups versus just fading strength. I have a couple of resources that might help with that."
];

const mockRecommendations = [
  { id: "rec1", type: "Video", title: "Trading Reversals: High-Probability Setups", url: "#", icon: <Film size={20} className="mr-2 text-primary"/>, description: "Learn to identify and trade market reversals with more confidence." },
  { id: "rec2", type: "Article", title: "The Importance of Trade Journaling for Improvement", url: "#", icon: <BookText size={20} className="mr-2 text-primary"/>, description: "Discover how consistent journaling can unlock patterns in your trading." },
  { id: "rec3", type: "Book Chapter", title: "Trading in the Zone - Chapter 3: Taking Responsibility", url: "#", icon: <BookText size={20} className="mr-2 text-primary"/>, description: "A classic read on developing the right mindset for consistent profitability." },
];

const PostMarketPage = () => {
  return (
    <div className="container mx-auto py-4 px-2 sm:px-4 md:py-6 space-y-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-foreground text-center sm:text-left">Post-Market Debrief</h1>

      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl sm:text-2xl flex items-center"><MessageSquareHeart size={24} className="mr-2 text-primary"/>MentorBull Reflection</CardTitle>
            <CardDescription>Review your trading day and identify key learnings with your AI mentor.</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <AIChatBot 
              aiPersonaName="MentorBull"
              aiPersonaImage="/trade_mentor_ai_logo.png"
              initialMessages={mockMentorConversation.map((text, index) => ({
                id: `conv-${index}`,
                sender: text.startsWith("MockUser:") ? 'user' : 'ai',
                text: text.replace("MockUser: ", "").replace("AI Mentor: ", ""),
                timestamp: new Date(Date.now() - (mockMentorConversation.length - index) * 120000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
              }))}
              contextualPrompt="What was your biggest lesson from today's market activity?"
              showUserInput={true}
              containerClassName="h-[400px] sm:h-full" // Ensure bot takes available space
            />
          </CardContent>
        </Card>

        <Card className="lg:col-span-1 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl sm:text-2xl">Growth Resources</CardTitle>
            <CardDescription>Personalized learning recommendations.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockRecommendations.map(rec => (
                <a key={rec.id} href={rec.url} target="_blank" rel="noopener noreferrer" className="block p-4 border border-border/60 rounded-lg hover:bg-accent/30 transition-colors shadow-sm hover:shadow-md">
                  <div className="flex items-start">
                    {rec.icon}
                    <div>
                        <p className="font-semibold text-base text-foreground">{rec.title}</p>
                        <p className="text-xs text-muted-foreground mt-1">{rec.description}</p>
                    </div>
                  </div>
                  <Button variant="link" className="text-xs mt-2 p-0 h-auto">View {rec.type}</Button>
                </a>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PostMarketPage;

