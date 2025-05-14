"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AIChatBot from "@/components/ai/AIChatBot";
import { BookOpen, PlayCircle, Zap, TrendingUp, CheckCircle, MessageSquare, Lightbulb, HelpCircle, Star } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import ThemeAwareLogo from '@/components/ui/ThemeAwareLogo';

interface LearningModule {
  id: string;
  title: string;
  completed: boolean;
  aiPrompt: string;
  estimatedTime?: string;
  difficulty?: "Beginner" | "Intermediate" | "Advanced";
}

interface LearningPath {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  progress: number;
  modules: LearningModule[];
  category?: string;
}

const mockLearningPaths: LearningPath[] = [
  {
    id: "lp1",
    title: "Trader Foundation Series",
    description: "Master market basics, technical analysis, and essential risk management.",
    icon: <BookOpen className="w-6 h-6 text-primary" />,
    progress: 0, // Will be calculated dynamically
    category: "Core Concepts",
    modules: [
      { id: "m1_1", title: "Intro to Stock Markets & Assets", completed: false, aiPrompt: "Let's start with the Intro to Stock Markets & Assets. What are you hoping to learn from this module, or what's one question you have about markets right now?", estimatedTime: "30 mins", difficulty: "Beginner" },
      { id: "m1_2", title: "Reading Charts: Candlesticks & Basic Patterns", completed: false, aiPrompt: "Now for Reading Charts. Candlesticks can tell a story. What's one chart pattern you've heard of or are curious about?", estimatedTime: "45 mins", difficulty: "Beginner" },
      { id: "m1_3", title: "Risk Management: Protecting Your Capital", completed: false, aiPrompt: "Risk Management is crucial. Before we dive in, what's your biggest concern when it comes to managing risk in trading?", estimatedTime: "1 hour", difficulty: "Beginner" },
      { id: "m1_4", title: "Introduction to Options Trading", completed: false, aiPrompt: "Options offer unique opportunities. What's one thing you'd like to understand about options trading by the end of this module?", estimatedTime: "1.5 hours", difficulty: "Intermediate" },
    ]
  },
  {
    id: "lp2",
    title: "Options Strategy Toolkit",
    description: "Dive into spreads, condors, and leveraging volatility for profit.",
    icon: <Zap className="w-6 h-6 text-primary" />,
    progress: 0,
    category: "Advanced Options",
    modules: [
      { id: "m2_1", title: "Mastering Vertical Spreads", completed: false, aiPrompt: "Vertical Spreads are a versatile tool. What's a market scenario where you think a vertical spread might be useful?", estimatedTime: "1 hour", difficulty: "Intermediate" },
      { id: "m2_2", title: "Income with Iron Condors", completed: false, aiPrompt: "Iron Condors are popular for generating income. What do you think are the ideal market conditions for an iron condor strategy?", estimatedTime: "1.5 hours", difficulty: "Advanced" },
      { id: "m2_3", title: "Trading Volatility: Vega & IV Rank", completed: false, aiPrompt: "Understanding Vega and Implied Volatility is key for options. How does high or low IV impact your decision to buy or sell options?", estimatedTime: "2 hours", difficulty: "Advanced" },
    ]
  },
  {
    id: "lp3",
    title: "Momentum Day Trading Tactics",
    description: "Learn to identify, enter, and manage fast-moving day trades.",
    icon: <TrendingUp className="w-6 h-6 text-primary" />,
    progress: 0,
    category: "Day Trading",
    modules: [
      { id: "m3_1", title: "Effective Momentum Scanning", completed: false, aiPrompt: "Finding stocks with momentum is the first step. What are some characteristics of a stock that's showing strong momentum?", estimatedTime: "45 mins", difficulty: "Intermediate" },
      { id: "m3_2", title: "Precision Entry & Exit Strategies", completed: false, aiPrompt: "In momentum trading, timing entries and exits is critical. What's one challenge you've faced with this?", estimatedTime: "1 hour", difficulty: "Intermediate" },
      { id: "m3_3", title: "Risk Control in Volatile Markets", completed: false, aiPrompt: "Volatile markets require tight risk control. What's your go-to method for managing risk in a fast-moving trade?", estimatedTime: "1 hour", difficulty: "Advanced" },
    ]
  },
];

const RadioButtonUnchecked = ({ className }: { className?: string }) => (
  <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
  </svg>
);

const EducationPage = () => {
  const [learningPaths, setLearningPaths] = useState<LearningPath[]>(() => 
    mockLearningPaths.map(path => ({
      ...path,
      progress: path.modules.length > 0 ? Math.round((path.modules.filter(m => m.completed).length / path.modules.length) * 100) : 0
    }))
  );
  const [selectedPath, setSelectedPath] = useState<LearningPath | null>(learningPaths[0] || null);
  const [initialMessageForAI, setInitialMessageForAI] = useState<string | undefined>("Welcome to the Trade Caddie Academy! I'm your personal learning guide, powered by live AI. Select a learning path or a specific module, and let's master it together. Ask me anything!");
  const [selectedModuleForContent, setSelectedModuleForContent] = useState<LearningModule | null>(null);
  const [chatKey, setChatKey] = useState(`education-general-${Date.now()}`); // Key to reset chat
  const [isChatReady, setIsChatReady] = useState(false);

  useEffect(() => {
    setIsChatReady(true);
  }, []);

  useEffect(() => {
    if (selectedPath) {
      setInitialMessageForAI(`You're exploring the '${selectedPath.title}' path. It covers ${selectedPath.description.toLowerCase()} Which module catches your eye, or shall I suggest where to start based on your goals? You can also ask me general questions about this topic.`);
      setChatKey(`education-${selectedPath.id}-${Date.now()}`);
    } else {
      setInitialMessageForAI("Welcome to the Academy! Which area of trading would you like to strengthen today? Feel free to ask any questions.");
      setChatKey(`education-general-${Date.now()}`);
    }
  }, [selectedPath]);

  const handleSelectPath = (path: LearningPath) => {
    setSelectedPath(path);
    setSelectedModuleForContent(null); 
  };

  const handleSelectModule = (module: LearningModule, pathTitle: string) => {
    setSelectedModuleForContent(module);
    const prompt = module.aiPrompt || `Let's discuss the module: '${module.title}' from the '${pathTitle}' path. What are your initial thoughts or questions? I'm here to explain and help you learn.`;
    setInitialMessageForAI(prompt);
    setChatKey(`education-module-${module.id}-${Date.now()}`);
  };
  
  const toggleModuleCompletion = (pathId: string, moduleId: string) => {
    let toggledModuleTitle = "";
    let newStatus = false;
    const updatedPaths = learningPaths.map(p => {
        if (p.id === pathId) {
            let completedCount = 0;
            const updatedModules = p.modules.map(m => {
                let currentModuleCompleted = m.completed;
                if (m.id === moduleId) {
                    newStatus = !m.completed;
                    toggledModuleTitle = m.title;
                    currentModuleCompleted = newStatus;
                }
                if (currentModuleCompleted) completedCount++;
                return { ...m, completed: m.id === moduleId ? newStatus : m.completed }; 
            });
            const newProgress = p.modules.length > 0 ? Math.round((completedCount / p.modules.length) * 100) : 0;
            return { ...p, modules: updatedModules, progress: newProgress };
        }
        return p;
    });
    setLearningPaths(updatedPaths);

    const currentSelectedPath = updatedPaths.find(p => p.id === pathId);
    if (currentSelectedPath) {
        setSelectedPath(currentSelectedPath); // Update selectedPath state to reflect new progress and module completion
    }

    const completionMessage = newStatus 
        ? `Fantastic! You've marked '${toggledModuleTitle}' as complete. Keep up the great work! What's next on your learning agenda, or would you like to discuss this module further?`
        : `Okay, '${toggledModuleTitle}' is now marked as incomplete. No worries, you can revisit it anytime. What would you like to focus on, or shall we continue with this module?`;
    
    setInitialMessageForAI(completionMessage);
    setChatKey(`education-module-toggle-${moduleId}-${Date.now()}`);
  };

  return (
    <div className="container mx-auto py-4 px-2 sm:px-4 md:py-6 space-y-6 text-foreground">
      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card">
        <CardHeader className="pb-4">
          <div className="flex items-center space-x-3">
            <Lightbulb size={32} className="text-primary"/>
            <CardTitle className="text-2xl sm:text-3xl text-primary">Trade Caddie Academy</CardTitle>
          </div>
          <CardDescription className="text-muted-foreground">
            Your AI-powered learning hub. Master trading concepts with personalized guidance from your Trade Caddie. Knowledge is your edge!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <Card className="bg-background/70 h-full flex flex-col">
                <CardHeader>
                  <CardTitle className="text-xl text-primary flex items-center"><MessageSquare size={22} className="mr-2"/>Caddie's Classroom</CardTitle>
                  <CardDescription className="text-muted-foreground">Ask questions, get explanations, and learn at your own pace.</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                {isChatReady && (
                  <AIChatBot 
                    key={chatKey} // Use key to force re-render and reset chat with new initial message
                    conversationId={chatKey} // Unique ID for conversation context
                    initialMessage={initialMessageForAI}
                    aiPersonaName="Trade Caddie (Educator)"
                    aiPersonaImageComponent ={
                        <ThemeAwareLogo 
                            alt="Trade Caddie AI Persona" 
                            width={40} 
                            height={40} 
                            className="rounded-full object-contain mr-2"
                        />
                    }
                    showUserInput={true}
                    containerClassName="h-[400px] sm:h-full"
                  />
                )}
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-2 space-y-6">
              <Card className="bg-background/70">
                <CardHeader>
                  <CardTitle className="text-xl text-primary">Your Learning Paths</CardTitle>
                  <CardDescription className="text-muted-foreground">Explore curated content. Click a path, then a module to learn and discuss with your Caddie.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4 grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {learningPaths.map(path => (
                      <button 
                        key={path.id} 
                        onClick={() => handleSelectPath(path)}
                        className={`p-3 border rounded-lg text-left transition-all duration-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary ${selectedPath?.id === path.id ? 'bg-primary/10 border-primary shadow-md' : 'bg-card hover:bg-accent/50 border-border'}`}
                      >
                        <div className="flex items-center mb-1.5">
                          {React.cloneElement(path.icon as React.ReactElement, { className: "w-7 h-7 text-primary" })}
                          <h3 className="ml-2.5 font-semibold text-md text-foreground">{path.title}</h3>
                        </div>
                        <p className="text-xs text-muted-foreground mb-1 leading-tight h-10 overflow-hidden">{path.description}</p>
                        <Progress value={path.progress} className="h-1.5 bg-secondary mt-1.5" indicatorClassName="bg-primary" />
                        <p className="text-xs text-muted-foreground mt-1">{path.progress}% complete</p>
                      </button>
                    ))}
                  </div>
                  
                  {selectedPath && (
                    <div className="mt-4 pt-4 border-t border-border">
                      <h3 className="text-lg font-semibold mb-2 text-foreground">Modules in: {selectedPath.title}</h3>
                      <ScrollArea className="h-[200px] sm:h-[220px] w-full rounded-md border border-border p-2 bg-muted/20">
                        {selectedPath.modules.map(module => (
                          <Card key={module.id} className={`p-2.5 mb-1.5 shadow-sm flex items-center justify-between hover:bg-accent/30 transition-colors ${selectedModuleForContent?.id === module.id ? 'ring-1 ring-primary bg-primary/5' : 'bg-card'}`}>
                            <div className="flex items-center flex-grow mr-2 cursor-pointer" onClick={() => handleSelectModule(module, selectedPath.title)}>
                              {module.completed ? 
                                <CheckCircle className="w-5 h-5 mr-2 text-primary flex-shrink-0" /> : 
                                <button onClick={(e) => { e.stopPropagation(); toggleModuleCompletion(selectedPath.id, module.id);}} title="Mark as complete/incomplete">
                                    <RadioButtonUnchecked className="w-5 h-5 mr-2 text-muted-foreground flex-shrink-0 hover:text-primary" />
                                </button>
                              }
                              <div onClick={() => handleSelectModule(module, selectedPath.title)}>
                                <span className={`text-sm ${module.completed ? 'text-muted-foreground line-through' : 'text-foreground'}`}>{module.title}</span>
                                <div className="text-xs text-muted-foreground flex items-center">
                                  {module.estimatedTime && <span className="mr-2">{module.estimatedTime}</span>}
                                  {module.difficulty && <span className={`px-1.5 py-0.5 rounded-full text-white text-[10px] ${module.difficulty === 'Beginner' ? 'bg-green-500' : module.difficulty === 'Intermediate' ? 'bg-yellow-500' : 'bg-red-500'}`}>{module.difficulty}</span>}
                                </div>
                              </div>
                            </div>
                            <Button variant="ghost" size="sm" onClick={() => handleSelectModule(module, selectedPath.title)} className="text-primary hover:bg-primary/10 h-auto p-1.5">
                                <PlayCircle size={18}/>
                            </Button>
                          </Card>
                        ))}
                      </ScrollArea>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EducationPage;

