import React from 'react';
import { motion } from 'framer-motion';
import { fadeInUp, scaleIn } from '../utils/animations';

interface ControlPanelProps {
  onModeSelect: (mode: 'ARP' | 'RARP') => void;
  onStartSimulation: () => void;
  onReset: () => void;
  onDatabaseAccess: () => void;
  onGenerateRandom: () => void;
  onRunFullDemo: () => void;
  currentMode: 'ARP' | 'RARP' | null;
  isSimulationRunning: boolean;
  className?: string;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  onModeSelect,
  onStartSimulation,
  onReset,
  onDatabaseAccess,
  onGenerateRandom,
  onRunFullDemo,
  currentMode,
  isSimulationRunning,
  className = ''
}) => {
  const buttons = [
    {
      id: 'arp',
      label: 'Enter ARP Nebula',
      icon: '📡',
      mode: 'ARP' as const,
      description: 'IP to MAC Resolution'
    },
    {
      id: 'rarp',
      label: 'Enter RARP Void',
      icon: '🔍',
      mode: 'RARP' as const,
      description: 'MAC to IP Assignment'
    }
  ];

  const actionButtons = [
    {
      id: 'database',
      label: 'Access Nebula Database',
      icon: '🗄️',
      action: onDatabaseAccess,
      color: 'border-cyber-purple bg-cyber-purple/20 text-cyber-purple'
    },
    {
      id: 'random',
      label: 'Generate Random Nebula',
      icon: '🎲',
      action: onGenerateRandom,
      color: 'border-cyber-orange bg-cyber-orange/20 text-cyber-orange'
    },
    {
      id: 'demo',
      label: 'Run Full Demo',
      icon: '🚀',
      action: onRunFullDemo,
      color: 'border-cyber-green bg-cyber-green/20 text-cyber-green'
    },
    {
      id: 'reset',
      label: 'Reset Simulation',
      icon: '🔄',
      action: onReset,
      color: 'border-cyber-red bg-cyber-red/20 text-cyber-red'
    }
  ];

  return (
    <motion.div
      className={`bg-gradient-to-br from-card-bg to-darker-bg border border-cyber-blue rounded-xl p-4 md:p-6 backdrop-blur-sm ${className}`}
      variants={fadeInUp}
      initial="initial"
      animate="animate"
    >
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-xl md:text-2xl font-cyber font-bold text-cyber-blue mb-2">
          Simulation Control Hub
        </h2>
        <div className="text-sm text-gray-400 mb-2">
          Select a protocol mode to begin
        </div>
        <div className="text-xs text-cyber-blue/70 bg-cyber-blue/10 p-3 rounded-lg border border-cyber-blue/30">
          <p className="mb-1">💡 <strong>Quick Guide:</strong></p>
          <p className="text-left">1. Choose ARP or RARP mode</p>
          <p className="text-left">2. Click a device pod on the network</p>
          <p className="text-left">3. Click "Begin Simulation"</p>
          <p className="text-left">4. Watch the animated packets!</p>
        </div>
      </div>

      {/* Mode Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {buttons.map((button) => (
          <motion.button
            key={button.id}
            onClick={() => onModeSelect(button.mode)}
            className={`
              relative p-4 rounded-xl border-2 transition-all duration-300
              ${currentMode === button.mode
                ? 'border-cyber-blue bg-cyber-blue/20 text-cyber-blue shadow-2xl'
                : 'border-gray-600 bg-gray-800/50 text-gray-300 hover:border-cyber-blue hover:bg-cyber-blue/10'
              }
              backdrop-blur-sm group
            `}
            variants={scaleIn}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isSimulationRunning}
          >
            {/* Holographic Background */}
            <div className="absolute inset-0 bg-cyber-grid bg-[size:20px_20px] opacity-5 rounded-xl" />
            
            <div className="relative flex flex-col items-center space-y-2">
              <div className="text-3xl md:text-4xl">{button.icon}</div>
              <div className="font-cyber font-bold text-sm md:text-base">
                {button.label}
              </div>
              <div className="text-xs text-gray-400">
                {button.description}
              </div>
            </div>

            {/* Selection Glow */}
            {currentMode === button.mode && (
              <motion.div
                className="absolute inset-0 rounded-xl border-2 border-cyber-blue opacity-50"
                animate={{
                  boxShadow: [
                    "0 0 10px #00ffff",
                    "0 0 20px #00ffff, 0 0 30px #00ffff",
                    "0 0 10px #00ffff"
                  ]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            )}
          </motion.button>
        ))}
      </div>

      {/* Start Simulation Button */}
      {currentMode && (
        <motion.button
          onClick={onStartSimulation}
          className="w-full p-4 mb-6 rounded-xl border-2 border-cyber-green bg-cyber-green/20 text-cyber-green
                     font-cyber font-bold text-lg md:text-xl
                     hover:bg-cyber-green/30 hover:shadow-2xl
                     transition-all duration-300 backdrop-blur-sm
                     disabled:opacity-50 disabled:cursor-not-allowed"
          variants={scaleIn}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={isSimulationRunning}
          initial="initial"
          animate="animate"
        >
          <div className="flex items-center justify-center space-x-3">
            <span className="text-2xl">🚀</span>
            <span>Begin {currentMode} Simulation</span>
          </div>
        </motion.button>
      )}

      {/* Action Buttons */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {actionButtons.map((button) => (
          <motion.button
            key={button.id}
            onClick={button.action}
            className={`
              p-3 rounded-lg border-2 transition-all duration-300
              ${button.color}
              hover:shadow-lg backdrop-blur-sm
              text-[10px] md:text-xs font-cyber font-bold
              whitespace-nowrap overflow-hidden text-ellipsis
              min-w-[80px] md:min-w-[100px]
              disabled:opacity-50 disabled:cursor-not-allowed
            `}
            variants={scaleIn}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={isSimulationRunning}
          >
            <div className="flex flex-col items-center space-y-1">
              <div className="text-lg">{button.icon}</div>
              <div className="text-center leading-tight">
                {button.label}
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Status Indicator */}
      <div className="mt-4 text-center">
        <div className={`text-sm font-mono ${
          isSimulationRunning ? 'text-cyber-green' : 'text-gray-400'
        }`}>
          {isSimulationRunning ? 'SIMULATION ACTIVE' : 'STANDBY MODE'}
        </div>
        {currentMode && (
          <div className="text-xs text-cyber-blue mt-1">
            Current Mode: {currentMode}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ControlPanel;
