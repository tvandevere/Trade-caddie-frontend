import React from 'react';

interface ContextualTipProps {
  message: string;
  // We can add props for positioning, arrow direction, etc. later
}

const ContextualTip: React.FC<ContextualTipProps> = ({ message }) => {
  return (
    <div style={{
      backgroundColor: 'rgba(0, 0, 50, 0.8)', // Dark blue, slightly transparent
      color: 'white',
      padding: '10px 15px',
      borderRadius: '8px',
      maxWidth: '250px',
      fontSize: '0.9rem',
      boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
      // Simple speech bubble like appearance for now
      position: 'relative', // For potential arrow later
      border: '1px solid rgba(255,255,255,0.2)',
    }}>
      {message}
    </div>
  );
};

export default ContextualTip;
