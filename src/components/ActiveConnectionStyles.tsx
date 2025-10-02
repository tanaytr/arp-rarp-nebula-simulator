import React from 'react';

export const ConnectionGradients: React.FC = () => {
  return (
    <svg style={{ position: 'absolute', width: 0, height: 0 }}>
      <defs>
        <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#4a5568" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#2d3748" stopOpacity="0.6" />
        </linearGradient>
        <linearGradient id="activeConnectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#00ffff" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#00ccff" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#0099ff" stopOpacity="0.8" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default ConnectionGradients;