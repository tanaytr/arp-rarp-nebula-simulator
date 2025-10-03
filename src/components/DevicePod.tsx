import React from 'react';
import { motion, useAnimation } from 'framer-motion';
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
  const controls = useAnimation();

  const getDeviceIcon = () => {
    if (device.type === 'hub') {
      return (
        <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
          <path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4z"/>
        </svg>
      );
    } else {
      return (
        <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
          <path d="M20 18c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2H0v2h24v-2h-4zM4 6h16v10H4V6z"/>
        </svg>
      );
    }
  };

  const getStatusColor = () => {
    if (!device.isOnline) return 'border-red-500 text-red-400 from-red-500/20 to-red-900/20';
    if (isSelected) return 'border-cyber-blue text-cyber-blue from-cyber-blue/20 to-cyber-purple/20';
    if (isAnimating) return 'border-cyber-green text-cyber-green from-cyber-green/20 to-cyber-blue/20';
    return 'border-cyber-purple text-cyber-purple from-cyber-purple/20 to-cyber-blue/20';
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
          bg-gradient-to-br ${getStatusColor()}
          border-2 rounded-xl
          shadow-lg hover:shadow-2xl
          transition-all duration-300
          flex flex-col items-center justify-center
          backdrop-blur-sm p-1
          overflow-hidden
        `}
        variants={isSelected ? deviceGlow : {}}
        animate={isSelected ? "animate" : "initial"}
        whileHover={{
          scale: 1.05,
          transition: { duration: 0.2 }
        }}
      >
        {/* Holographic Background Effect */}
        <div className="absolute inset-0 bg-cyber-grid bg-[size:20px_20px] opacity-10 rounded-xl" />
        
        {/* Device Icon */}
        <motion.div
          className="text-2xl md:text-3xl mb-1 relative z-10"
          animate={isAnimating ? { 
            rotate: [0, 360],
            scale: [1, 1.2, 1],
            filter: ['brightness(1)', 'brightness(1.5)', 'brightness(1)']
          } : {}}
          transition={{
            duration: 2,
            repeat: isAnimating ? Infinity : 0,
            ease: "easeInOut"
          }}
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
          <>
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
            <motion.div
              className="absolute inset-0 bg-cyber-blue/5 rounded-xl"
              animate={{
                opacity: [0.05, 0.2, 0.05]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </>
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
