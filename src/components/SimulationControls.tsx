import React from 'react';
import { motion } from 'framer-motion';
import { SimulationState } from '../types';

interface SimulationControlsProps {
  simulationState: SimulationState;
  onReset: () => void;
  onBackToTitle: () => void;
  className?: string;
}

export const SimulationControls: React.FC<SimulationControlsProps> = ({
  simulationState,
  onReset,
  onBackToTitle,
  className = ''
}) => {
  return (
    <div className={`flex flex-col space-y-4 ${className}`}>
      {simulationState.isComplete && (
        <>
          <motion.button
            onClick={onReset}
            className="px-6 py-3 bg-cyber-blue/20 hover:bg-cyber-blue/30 
                     border-2 border-cyber-blue rounded-lg
                     font-cyber text-white transition-all duration-200
                     flex items-center justify-center space-x-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>Start New Simulation</span>
          </motion.button>
          
          <motion.button
            onClick={onBackToTitle}
            className="px-6 py-3 bg-cyber-orange/20 hover:bg-cyber-orange/30 
                     border-2 border-cyber-orange rounded-lg
                     font-cyber text-white transition-all duration-200
                     flex items-center justify-center space-x-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>Return to Title Screen</span>
          </motion.button>
        </>
      )}
    </div>
  );
};

export default SimulationControls;