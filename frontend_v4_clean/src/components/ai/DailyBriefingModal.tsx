import React from 'react';

interface DailyBriefingModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const DailyBriefingModal: React.FC<DailyBriefingModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
    }}>
      <div style={{
        backgroundColor: '#1f2937', // Equivalent to bg-gray-800
        color: 'white',
        padding: '25px',
        borderRadius: '12px',
        width: '90%',
        maxWidth: '500px',
        boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
        border: '1px solid rgba(255,255,255,0.1)',
      }}>
        <h2 style={{
          fontSize: '1.75rem', // text-2xl
          fontWeight: 'bold',
          marginBottom: '20px',
          color: '#60a5fa', // text-sky-400
          textAlign: 'center',
        }}>{title}</h2>
        <div style={{ marginBottom: '25px', fontSize: '1rem', lineHeight: '1.6' }}>
          {children}
        </div>
        <button 
          onClick={onClose}
          style={{
            backgroundColor: '#3b82f6', // bg-blue-600
            color: 'white',
            padding: '10px 20px',
            borderRadius: '8px',
            border: 'none',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: '600',
            display: 'block',
            width: '100%',
            transition: 'background-color 0.2s ease',
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#2563eb')} // bg-blue-700 on hover
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#3b82f6')}
        >
          Got it, let's continue!
        </button>
      </div>
    </div>
  );
};

export default DailyBriefingModal;
