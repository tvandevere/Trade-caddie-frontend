"use client";

import React, { useState } from 'react';
import AIChatBot from '@/components/ai/AIChatBot';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlayCircle, CheckCircle, XCircle, RotateCcw } from 'lucide-react';
import ThemeAwareLogo from '@/components/ui/ThemeAwareLogo';

interface ScenarioStep {
  id: string;
  description: string; // Presented to the user
  aiPrompt: string;    // What the AI says to guide the user or ask a question
  options?: { text: string; feedback: string; nextStepId?: string; isCorrect?: boolean }[]; // For multiple choice questions
  isCompleted?: boolean; // For tracking progress
}

interface Scenario {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  steps: ScenarioStep[];
}

const sampleScenarios: Scenario[] = [
  {
    id: 'scenario1',
    title: 'Understanding a Basic Chart Pattern',
    description: 'Learn to identify a common chart pattern and how traders might interpret it.',
    icon: <PlayCircle size={24} className="text-primary" />,
    steps: [
      {
        id: 's1_step1',
        description: 'Introduction to Head and Shoulders Pattern.',
        aiPrompt: "Welcome to our first mini-scenario! We\'re going to look at a classic chart pattern called \'Head and Shoulders\'. It often signals a potential trend reversal. Ready to see an example?",
        options: [{ text: "Yes, show me!", feedback: "Great! Let\'s look at a chart...", nextStepId: 's1_step2' }]
      },
      {
        id: 's1_step2',
        description: 'Identifying the pattern on a chart.',
        aiPrompt: "Okay, imagine you see a chart with three peaks. The middle peak (the \'head\') is the highest, and the two outside peaks (the \'shoulders\') are lower and roughly equal. There\'s also a \'neckline\' connecting the lows between the peaks. Can you visualize that?",
        options: [
          { text: "Yes, I can visualize it.", feedback: "Excellent! That visual is key.", nextStepId: 's1_step3' },
          { text: "Not really, can you explain more?", feedback: "No problem! Think of it like a silhouette of a person\'s head and shoulders. The neckline is like their collar. We\'ll look at an image next.", nextStepId: 's1_step3' }
        ]
      },
      {
        id: 's1_step3',
        description: 'Interpreting the pattern.',
        aiPrompt: "This pattern, especially if it appears after an uptrend, is often considered bearish. This means traders might expect the price to go down if it breaks below the neckline. What do you think breaking the neckline signifies?",
        options: [
          { text: "A potential sell signal.", feedback: "Exactly! Breaking the neckline is often seen as a confirmation to sell or short.", isCorrect: true, nextStepId: 's1_step4' },
          { text: "A potential buy signal.", feedback: "Not quite. Since it\'s a bearish pattern, breaking the neckline usually suggests the price might fall.", isCorrect: false },
          { text: "The pattern is invalid.", feedback: "Not necessarily. The break of the neckline is a key part of the pattern\'s interpretation.", isCorrect: false }
        ]
      },
      {
        id: 's1_step4',
        description: 'Scenario complete.',
        aiPrompt: "You\'ve got the basics of the Head and Shoulders pattern! Remember, no pattern is foolproof, but understanding them is a great tool. Well done! Want to try another scenario or review this one?",
        isCompleted: true
      }
    ]
  },
  // Add more scenarios here
];

const InteractiveMiniScenario: React.FC<{ scenario: Scenario }> = ({ scenario }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [aiMessages, setAiMessages] = useState<any[]>([]);
  const [scenarioCompleted, setScenarioCompleted] = useState(false);

  const currentStep = scenario.steps[currentStepIndex];

  useEffect(() => {
    setAiMessages([
      {
        id: `scenario_intro_`,
        sender: "ai",
        text: currentStep.aiPrompt,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  }, [currentStep.aiPrompt]);

  const handleOptionSelect = (option: any) => {
    let feedbackMessage = option.feedback;
    if (option.isCorrect === true) {
      feedbackMessage = `Correct! ` + feedbackMessage;
    } else if (option.isCorrect === false) {
      feedbackMessage = `Hmm, let\'s think about that. ` + feedbackMessage;
    }

    const newAiMessage = {
      id: `ai_feedback_`,
      sender: "ai",
      text: feedbackMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setAiMessages(prev => [...prev, newAiMessage]);

    if (option.nextStepId) {
      const nextStepIdx = scenario.steps.findIndex(s => s.id === option.nextStepId);
      if (nextStepIdx !== -1) {
        setCurrentStepIndex(nextStepIdx);
        if(scenario.steps[nextStepIdx].isCompleted) setScenarioCompleted(true);
      } else {
        setScenarioCompleted(true); // Reached end or invalid next step
      }
    } else if (currentStep.isCompleted) {
        setScenarioCompleted(true);
    }
  };

  const resetScenario = () => {
    setCurrentStepIndex(0);
    setScenarioCompleted(false);
    setAiMessages([
        {
          id: `scenario_restart_`,
          sender: "ai",
          text: scenario.steps[0].aiPrompt,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
  }

  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card border border-border rounded-lg w-full mb-6">
      <CardHeader className="pb-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            {scenario.icon}
          </div>
          <div>
            <CardTitle className="text-xl font-semibold text-primary">{scenario.title}</CardTitle>
            <CardDescription className="text-sm text-muted-foreground mt-1">{scenario.description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <AIChatBot
          aiPersonaName="Scenario Caddie"
          aiPersonaImageComponent={<ThemeAwareLogo alt="Caddie" width={40} height={40} className="rounded-full" />}
          initialMessages={aiMessages}
          contextualPrompt={currentStep.aiPrompt} 
          showUserInput={false} // We use buttons for scenario interaction
          containerClassName="h-[250px] sm:h-[300px]"
        />
        {!scenarioCompleted && currentStep.options && (
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {currentStep.options.map((opt, index) => (
              <Button 
                key={index} 
                variant="outline" 
                onClick={() => handleOptionSelect(opt)}
                className="justify-start text-left h-auto py-2 whitespace-normal"
              >
                {opt.text}
              </Button>
            ))}
          </div>
        )}
        {scenarioCompleted && (
            <div className="mt-4 text-center p-4 bg-muted/50 rounded-lg border border-border">
                <CheckCircle size={40} className="text-green-500 mx-auto mb-2" />
                <p className="font-semibold text-foreground">Scenario Complete!</p>
                <p className="text-sm text-muted-foreground mb-3">You've finished: {scenario.title}</p>
                <Button onClick={resetScenario} variant="default">
                    <RotateCcw size={16} className="mr-2" /> Try Again or Another Scenario
                </Button>
            </div>
        )}
      </CardContent>
    </Card>
  );
};

// Main component to display a list of scenarios (for Education Page)
const ScenarioList = () => {
  return (
    <div className="space-y-8">
      {sampleScenarios.map(sc => (
        <InteractiveMiniScenario key={sc.id} scenario={sc} />
      ))}
    </div>
  );
};

export default ScenarioList;
export { InteractiveMiniScenario }; // Export for individual use if needed

