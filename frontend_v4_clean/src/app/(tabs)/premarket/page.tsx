"use client";

import React, { useState, useEffect } from 'react';
import AIChatBot from '@/components/ai/AIChatBot';

const PreMarketPage = () => {
  const [checklistItems, setChecklistItems] = useState([
    { id: 1, text: 'Review overnight market news (global indices, futures)', completed: false, details: '', aiPrompt: 'Provide a summary of major overnight market news, including changes in global indices and futures relevant to US markets.' },
    { id: 2, text: "Check economic calendar for today's events (e.g., Fed announcements, jobs reports)", completed: false, details: '', aiPrompt: 'What are the key economic events scheduled for today that could impact the US stock market?' },
    { id: 3, text: 'Analyze pre-market movers (top gainers and losers)', completed: false, details: '', aiPrompt: 'List some of the top pre-market gainers and losers in the US stock market and briefly explain potential reasons for their movement.' },
    { id: 4, text: 'Review your watchlist for potential trade setups', completed: false, details: '', aiPrompt: 'Based on general market conditions and recent news, what are some things to look for when reviewing a stock watchlist for potential day trade setups?' },
    { id: 5, text: 'Define your trading plan for the day (max loss, profit targets, strategies)', completed: false, details: '', aiPrompt: 'Help me think through creating a daily trading plan. What are the key components I should define before the market opens?' },
    // { id: 6, text: 'Check your trading platform and internet connection', completed: false, details: 'Ensure everything is working correctly.', aiPrompt: null }, // Removed as per user request
    { id: 7, text: 'Mental preparation: review trading psychology reminders', completed: false, details: '', aiPrompt: 'Provide some key trading psychology reminders to help me stay focused and disciplined today.' },
  ]);
  const [activeItemForAIChat, setActiveItemForAIChat] = useState<{ id: number; text: string; aiPrompt: string | null } | null>(null);
  const [initialMessageForAI, setInitialMessageForAI] = useState<string | undefined>(undefined);
  const [triggerAIChat, setTriggerAIChat] = useState(0); // State to trigger AI Chat re-render or action

  const handleToggleComplete = (id: number) => {
    setChecklistItems(
      checklistItems.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const handleGetAIDetails = (item: { id: number; text: string; aiPrompt: string | null }) => {
    if (item.aiPrompt) {
      setActiveItemForAIChat(item);
      // Construct a clear initial message for the AI when an item is selected
      const message = `Okay Caddie, for my pre-market routine, let's focus on: "${item.text}". ${item.aiPrompt}`;
      setInitialMessageForAI(message);
      setTriggerAIChat(prev => prev + 1); // Trigger AIChatBot to process this new initial message
    } else {
      setChecklistItems(
        checklistItems.map((i) =>
          i.id === item.id ? { ...i, details: 'This item is a manual check. Please ensure it is completed.' } : i
        )
      );
      setActiveItemForAIChat(null);
      setInitialMessageForAI("This item is a manual check. Please ensure it is completed. Ask me anything else if you need!");
      setTriggerAIChat(prev => prev + 1);
    }
  };

  useEffect(() => {
    setInitialMessageForAI("Welcome to your Pre-Market routine! I'm your Trade Caddie, here to help you prepare for the trading day. Let's go through your checklist. Click \"Ask Caddie\" next to an item to get started, or ask me anything else about pre-market preparation.");
    setTriggerAIChat(prev => prev + 1); // Trigger on initial load
  }, []);

  return (
    <div className="container mx-auto p-4 flex flex-col md:flex-row gap-4 h-[calc(100vh-var(--bottom-nav-height)-var(--global-header-height))]">
      <div className="md:w-1/2 h-full overflow-y-auto bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Pre-Market Routine</h1>
        <ul className="space-y-3">
          {checklistItems.map((item) => (
            <li key={item.id} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-md shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={item.completed}
                    onChange={() => handleToggleComplete(item.id)}
                    className="h-5 w-5 text-green-600 border-gray-300 rounded focus:ring-green-500 dark:border-gray-600 dark:bg-gray-900 dark:focus:ring-green-600 dark:ring-offset-gray-800"
                  />
                  <span className={`ml-3 text-sm font-medium ${item.completed ? 'line-through text-gray-500 dark:text-gray-400' : 'text-gray-900 dark:text-gray-100'}`}>
                    {item.text}
                  </span>
                </div>
                {item.aiPrompt && (
                  <button
                    onClick={() => handleGetAIDetails(item)}
                    className="text-xs bg-green-500 hover:bg-green-600 text-white font-semibold py-1 px-2 rounded-md transition-colors duration-150"
                  >
                    Ask Caddie
                  </button>
                )}
              </div>
              {item.details && !item.aiPrompt && (
                <p className="mt-2 text-xs text-gray-600 dark:text-gray-300 pl-8">{item.details}</p>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div className="md:w-1/2 h-full flex flex-col bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <AIChatBot 
          conversationId={`premarket-${activeItemForAIChat?.id || 'general'}`}
          initialMessage={initialMessageForAI}
          key={`premarket-chat-${triggerAIChat}`} // Use triggerAIChat in key to force re-render with new initial message
        />
      </div>
    </div>
  );
};

export default PreMarketPage;

