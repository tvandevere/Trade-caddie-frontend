"use client";

import React, { useState, useEffect } from 'react';
import './TradingDayProgress.css';
import { CheckCircle, RadioButtonUnchecked, Loader2 } from 'lucide-react';

interface TradingPhase {
  id: string;
  name: string;
  status: 'pending' | 'active' | 'completed'; // pending, active, completed
}

interface TradingDayProgressProps {
  currentPhaseId?: string; // Optional: to manually set the active phase for testing/demo
  // In a real app, this might come from a global state or API based on market times
}

const TradingDayProgress: React.FC<TradingDayProgressProps> = ({ currentPhaseId }) => {
  const [phases, setPhases] = useState<TradingPhase[]>([
    { id: 'pre-market', name: 'Pre-Market', status: 'pending' },
    { id: 'market-open', name: 'Market Open', status: 'pending' },
    { id: 'post-market', name: 'Post-Market', status: 'pending' },
  ]);

  useEffect(() => {
    // Simulate phase changes based on currentPhaseId prop or time (simplified)
    // In a real app, this logic would be more robust, likely driven by actual market hours
    // or a global application state.
    let activePhaseFound = false;
    const updatedPhases = phases.map(phase => {
      if (currentPhaseId && phase.id === currentPhaseId) {
        activePhaseFound = true;
        return { ...phase, status: 'active' };
      } else if (currentPhaseId && activePhaseFound) {
        return { ...phase, status: 'pending' }; // Phases after active are pending
      } else if (currentPhaseId) {
        return { ...phase, status: 'completed' }; // Phases before active are completed
      }
      return phase; // Default to current status if no currentPhaseId
    });

    // If no currentPhaseId is provided, try to determine by time (very simplified example)
    if (!currentPhaseId) {
        const now = new Date();
        const hour = now.getHours();
        let newPhases = [...updatedPhases]; // Start with a copy

        if (hour < 9) { // Before 9 AM: Pre-Market active
            newPhases = newPhases.map(p => 
                p.id === 'pre-market' ? {...p, status: 'active'} : 
                p.id === 'market-open' ? {...p, status: 'pending'} :
                p.id === 'post-market' ? {...p, status: 'pending'} : p
            );
        } else if (hour >= 9 && hour < 16) { // 9 AM - 4 PM: Market Open
            newPhases = newPhases.map(p => 
                p.id === 'pre-market' ? {...p, status: 'completed'} : 
                p.id === 'market-open' ? {...p, status: 'active'} :
                p.id === 'post-market' ? {...p, status: 'pending'} : p
            );
        } else { // After 4 PM: Post-Market
            newPhases = newPhases.map(p => 
                p.id === 'pre-market' ? {...p, status: 'completed'} : 
                p.id === 'market-open' ? {...p, status: 'completed'} :
                p.id === 'post-market' ? {...p, status: 'active'} : p
            );
        }
        setPhases(newPhases);
    } else {
        setPhases(updatedPhases);
    }

  }, [currentPhaseId]); // Rerun if currentPhaseId changes

  const getIcon = (status: TradingPhase['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="icon completed-icon" />;
      case 'active':
        return <Loader2 className="icon active-icon animate-spin" />;
      case 'pending':
      default:
        return <RadioButtonUnchecked className="icon pending-icon" />;
    }
  };

  return (
    <div className="trading-day-progress-container">
      {phases.map((phase, index) => (
        <React.Fragment key={phase.id}>
          <div className={`progress-segment ${phase.status}`}>
            <div className="segment-icon-name">
              {getIcon(phase.status)}
              <span className="segment-name">{phase.name}</span>
            </div>
          </div>
          {index < phases.length - 1 && <div className={`progress-connector ${phases[index+1].status !== 'pending' ? 'completed' : ''}`}></div>}
        </React.Fragment>
      ))}
    </div>
  );
};

export default TradingDayProgress;

