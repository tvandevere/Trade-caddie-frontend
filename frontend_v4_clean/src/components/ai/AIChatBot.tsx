"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import ThemeAwareLogo from "@/components/ui/ThemeAwareLogo";
import { SparklesIcon } from "@heroicons/react/20/solid"; // Or from /24/solid if preferred

interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
}

interface AIChatBotProps {
  initialMessage?: string;
  initialPrompts?: string[];
  botPersonaName?: string;
  contextualSystemPrompt?: string;
  conversationId: string; 
}

const AIChatBot: React.FC<AIChatBotProps> = ({
  initialMessage,
  initialPrompts,
  botPersonaName = "Trade Caddie",
  contextualSystemPrompt = "You are Trade Caddie, a helpful AI assistant for traders.",
  conversationId
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const [currentPrompts, setCurrentPrompts] = useState<string[]>(initialPrompts || []);
  const initialMessageProcessedRef = useRef(false);
  const currentAiMessageIdRef = useRef<string | null>(null); // Ref to store current AI message ID for streaming

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  useEffect(() => {
    initialMessageProcessedRef.current = false;
    setMessages([]); 
    currentAiMessageIdRef.current = null;
  }, [conversationId]);

  const addMessage = useCallback((text: string, sender: "user" | "ai", id?: string) => {
    const newMessage: Message = {
      id: id || crypto.randomUUID(),
      text,
      sender,
      timestamp: new Date(),
    };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    return newMessage.id;
  }, []);

  useEffect(() => {
    if (initialMessage && !initialMessageProcessedRef.current) {
      addMessage(initialMessage, "ai");
      initialMessageProcessedRef.current = true;
    }
  }, [initialMessage, addMessage, conversationId]);

  const handleSendMessage = async (messageText?: string) => {
    const textToSend = messageText || inputValue;
    if (textToSend.trim() === "") return;

    addMessage(textToSend, "user");
    if (!messageText) {
      setInputValue("");
    }
    setCurrentPrompts([]);
    setIsLoading(true);
    currentAiMessageIdRef.current = null; // Reset before new AI message

    const historyForAPI = messages.map(msg => (
      { role: msg.sender === "user" ? "user" : "assistant", content: msg.text }
    ));
    const currentMessageForHistory = { role: "user", content: textToSend };

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...historyForAPI, currentMessageForHistory],
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `API error status ${response.status}`);
      }

      if (!response.body) {
        throw new Error("Response body is null");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulatedResponse = "";
      
      const newAiMessageId = crypto.randomUUID();
      currentAiMessageIdRef.current = newAiMessageId;
      setMessages(prev => [...prev, { id: newAiMessageId, text: "▋", sender: "ai", timestamp: new Date() }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          break;
        }
        const chunk = decoder.decode(value, { stream: true });
        accumulatedResponse += chunk;
        setMessages(prevMessages =>
          prevMessages.map(msg =>
            msg.id === newAiMessageId ? { ...msg, text: accumulatedResponse + "▋" } : msg
          )
        );
      }
      setMessages(prevMessages =>
        prevMessages.map(msg =>
          msg.id === newAiMessageId ? { ...msg, text: accumulatedResponse } : msg
        )
      );
      currentAiMessageIdRef.current = null; // Clear after streaming completes

    } catch (error) {
      console.error("Error sending message to AI:", error);
      let errorMessageText = "Sorry, something went wrong. Please try again.";
      if (error instanceof Error) {
        errorMessageText = error.message;
      }
      if (currentAiMessageIdRef.current) {
        setMessages(prevMessages =>
          prevMessages.map(msg =>
            msg.id === currentAiMessageIdRef.current ? { ...msg, text: errorMessageText } : msg
          )
        );
      } else {
        addMessage(errorMessageText, "ai");
      }
      currentAiMessageIdRef.current = null; // Clear on error too
    }
    setIsLoading(false);
  };

  const handlePromptClick = (prompt: string) => {
    handleSendMessage(prompt);
  };

  return (
    <div className="flex flex-col h-full max-w-2xl mx-auto bg-base-100 shadow-xl rounded-lg">
      <div className="p-4 border-b border-base-300 flex items-center">
        <ThemeAwareLogo alt={`${botPersonaName} Logo`} width={40} height={40} className="mr-3" />
        <h2 className="text-xl font-semibold text-base-content">{botPersonaName}</h2>
      </div>

      <div className="flex-grow p-4 space-y-4 overflow-y-auto bg-base-200/30">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-2 rounded-xl shadow ${msg.sender === "user"
                  ? "bg-primary text-primary-content"
                  : "bg-base-300 text-base-content"}`}
            >
              <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
              <p className="text-xs opacity-70 mt-1 text-right">
                {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </p>
            </div>
          </div>
        ))}
        {isLoading && !messages.find(m => m.id === currentAiMessageIdRef.current && m.text.endsWith("▋")) && (
          <div className="flex justify-start">
            <div className="max-w-xs md:max-w-md lg:max-w-lg px-4 py-2 rounded-xl shadow bg-base-300 text-base-content">
              <p className="text-sm flex items-center">
                <SparklesIcon className="w-5 h-5 mr-2 animate-pulse" />
                <span>{botPersonaName} is thinking...</span>
              </p>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {currentPrompts && currentPrompts.length > 0 && !isLoading && (
        <div className="p-2 border-t border-base-300 bg-base-100">
          <div className="flex flex-wrap gap-2 justify-center">
            {currentPrompts.map((prompt, index) => (
              <button
                key={index}
                onClick={() => handlePromptClick(prompt)}
                className="btn btn-outline btn-sm text-xs"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="p-4 border-t border-base-300 bg-base-100">
        <div className="flex items-center">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && !isLoading && handleSendMessage()}
            placeholder="Ask Trade Caddie..."
            className="input input-bordered w-full mr-2 focus:ring-primary focus:border-primary"
            disabled={isLoading}
          />
          <button
            onClick={() => handleSendMessage()}
            className="btn btn-primary btn-square"
            disabled={isLoading && !!messages.find(m => m.id === currentAiMessageIdRef.current && m.text.endsWith("▋"))} 
          >
            <PaperAirplaneIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIChatBot;

