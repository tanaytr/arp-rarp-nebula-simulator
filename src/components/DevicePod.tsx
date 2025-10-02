import React from 'react';
import { motion } from 'framer-motion';
import { Device } from '../types';
import { deviceGlow, scaleIn } from '../utils/animations';

interface DevicePodProps {
  device: Device;
  isSelected: boolean;
  onClick: () => void;
  isAnimating?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const DevicePod: React.FC<DevicePodProps> = ({
  device,
  isSelected,
  onClick,
  isAnimating = false,
  className = '',
  style = {}
}) => {
  const getDeviceIcon = () => {
    if (device.name.includes('Router') || device.name.includes('Hub')) {
      return '🔄';
    } else if (device.name.includes('Server')) {
      return '🖥️';
    } else {
      return '💻';
    }
  };

  const getStatusColor = () => {
    if (!device.isOnline) return 'border-red-500 text-red-400';
    if (isSelected) return 'border-cyber-blue text-cyber-blue';
    if (isAnimating) return 'border-cyber-green text-cyber-green';
    return 'border-cyber-purple text-cyber-purple';
  };

  return (
    <motion.div
      className={`relative cursor-pointer group ${className}`}
      style={style}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      variants={scaleIn}
      initial="initial"
      animate="animate"
    >
      {/* Device Pod Container */}
      <motion.div
        className={`
          relative w-28 h-32 md:w-36 md:h-40
          bg-gradient-to-br from-card-bg to-darker-bg
          border-2 rounded-xl
          ${getStatusColor()}
          ${isSelected ? 'shadow-2xl' : 'shadow-lg'}
          transition-all duration-300
          flex flex-col items-center justify-center
          backdrop-blur-sm p-1
        `}
        variants={isSelected ? deviceGlow : {}}
        animate={isSelected ? "animate" : "initial"}
      >
        {/* Holographic Background Effect */}
        <div className="absolute inset-0 bg-cyber-grid bg-[size:20px_20px] opacity-10 rounded-xl" />
        
        {/* Device Icon */}
        <motion.div
          className="text-2xl md:text-3xl mb-1"
          animate={isAnimating ? { 
            rotate: [0, 360],
            scale: [1, 1.2, 1]
          } : {}}
          transition={{ duration: 1, repeat: isAnimating ? Infinity : 0 }}
        >
          {getDeviceIcon()}
        </motion.div>

        {/* Device Name */}
        <div className="text-xs md:text-sm font-cyber font-bold text-center leading-tight px-1">
          {device.name.split(' ')[0]}
        </div>

        {/* IP Address */}
        <div className="text-xs font-mono text-cyber-green text-center leading-tight px-1">
          {device.ip}
        </div>

        {/* MAC Address */}
        <div className="text-xs font-mono text-cyber-purple text-center leading-tight px-1">
          {device.mac}
        </div>

        {/* Status Indicator */}
        <div className={`
          absolute top-1 right-1 w-2 h-2 rounded-full
          ${device.isOnline ? 'bg-cyber-green' : 'bg-red-500'}
          ${isAnimating ? 'animate-pulse' : ''}
        `} />

        {/* Selection Glow */}
        {isSelected && (
          <motion.div
            className="absolute inset-0 border-2 border-cyber-blue rounded-xl opacity-75"
            animate={{
              boxShadow: [
                "0 0 10px #00ffff",
                "0 0 20px #00ffff, 0 0 30px #00ffff",
                "0 0 10px #00ffff"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
      </motion.div>

      {/* Device Info Tooltip */}
      <motion.div
        className="absolute -bottom-16 left-1/2 transform -translate-x-1/2
                   bg-dark-bg border border-cyber-blue rounded-lg p-2
                   opacity-0 group-hover:opacity-100 transition-opacity duration-300
                   z-50 min-w-max"
        initial={{ opacity: 0, y: 10 }}
        whileHover={{ opacity: 1, y: 0 }}
      >
        <div className="text-xs font-mono space-y-1">
          <div className="text-cyber-blue font-bold">{device.name}</div>
          <div className="text-cyber-green">IP: {device.ip}</div>
          <div className="text-cyber-purple">MAC: {device.mac}</div>
          <div className={`text-xs ${device.isOnline ? 'text-cyber-green' : 'text-red-400'}`}>
            {device.isOnline ? 'ONLINE' : 'OFFLINE'}
          </div>
        </div>
        
        {/* Tooltip Arrow */}
        <div className="absolute -top-1 left-1/2 transform -translate-x-1/2
                        w-2 h-2 bg-dark-bg border-l border-t border-cyber-blue rotate-45" />
      </motion.div>

      {/* Connection Lines */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Glowing connection points */}
        <div className="absolute top-0 left-1/2 w-1 h-1 bg-cyber-blue rounded-full transform -translate-x-1/2" />
        <div className="absolute bottom-0 left-1/2 w-1 h-1 bg-cyber-blue rounded-full transform -translate-x-1/2" />
        <div className="absolute left-0 top-1/2 w-1 h-1 bg-cyber-blue rounded-full transform -translate-y-1/2" />
        <div className="absolute right-0 top-1/2 w-1 h-1 bg-cyber-blue rounded-full transform -translate-y-1/2" />
      </div>
    </motion.div>
  );
};

export default DevicePod;
