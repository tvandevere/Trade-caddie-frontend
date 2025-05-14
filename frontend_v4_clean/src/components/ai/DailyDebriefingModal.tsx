import React from 'react';
import { MentorBullMascot } from './MentorBullMascot'; // Assuming mascot is used

interface DailyDebriefingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DailyDebriefingModal: React.FC<DailyDebriefingModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed', 
      top: 0, 
      left: 0, 
      right: 0, 
      bottom: 0, 
      backgroundColor: 'rgba(0, 0, 0, 0.5)', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      zIndex: 1000,
    }}>
      <div style={{
        backgroundColor: 'white', 
        padding: '30px',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        maxWidth: '500px',
        width: '90%',
        textAlign: 'center',
        color: '#333',
      }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
          <MentorBullMascot size={80} />
        </div>
        <h2 style={{ fontSize: '1.8em', marginBottom: '15px', color: '#1a237e' }}>MentorBull's Post-Market Debrief</h2>
        <p style={{ fontSize: '1.1em', lineHeight: 1.6, marginBottom: '10px' }}>
          Great job navigating the markets today! Let's review your trades and identify key learnings.
        </p>
        <p style={{ fontSize: '1.1em', lineHeight: 1.6, marginBottom: '20px' }}>
          We'll look at what went well, areas for improvement, and how today's session aligns with your overall trading goals.
        </p>
        <button 
          onClick={onClose} 
          style={{
            backgroundColor: '#3f51b5', 
            color: 'white', 
            border: 'none', 
            padding: '12px 25px', 
            borderRadius: '5px', 
            cursor: 'pointer', 
            fontSize: '1em',
            fontWeight: 'bold',
            transition: 'background-color 0.3s ease',
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#303f9f')}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#3f51b5')}
        >
          Let's Begin Debrief
        </button>
      </div>
    </div>
  );
};
