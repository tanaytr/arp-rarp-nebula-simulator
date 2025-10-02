import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Packet } from '../types';
import { packetAnimation } from '../utils/animations';

interface PacketAnimationProps {
  packet: Packet;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  onComplete: () => void;
  className?: string;
}

const PacketAnimation: React.FC<PacketAnimationProps> = ({
  packet,
  startX,
  startY,
  endX,
  endY,
  onComplete,
  className = ''
}) => {
  const [progress, setProgress] = useState(0);
  const [particles, setParticles] = useState<Array<{id: string, x: number, y: number}>>([]);

  const getPacketIcon = () => {
    switch (packet.type) {
      case 'ARP_REQUEST': return '📡';
      case 'ARP_REPLY': return '✅';
      case 'RARP_REQUEST': return '🔍';
      case 'RARP_REPLY': return '🎯';
      default: return '📦';
    }
  };

  const getPacketColor = () => {
    switch (packet.type) {
      case 'ARP_REQUEST': return 'border-cyber-blue bg-cyber-blue/20';
      case 'ARP_REPLY': return 'border-cyber-green bg-cyber-green/20';
      case 'RARP_REQUEST': return 'border-cyber-orange bg-cyber-orange/20';
      case 'RARP_REPLY': return 'border-neon-pink bg-neon-pink/20';
      default: return 'border-cyber-purple bg-cyber-purple/20';
    }
  };

  useEffect(() => {
    const duration = 2000; // 2 seconds
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          onComplete();
          return 100;
        }
        return prev + 2;
      });
    }, duration / 50);

    return () => clearInterval(interval);
  }, [onComplete]);

  useEffect(() => {
    // Generate trailing particles
    const particleInterval = setInterval(() => {
      setParticles((prev) => {
        const newParticles = [...prev, {
          id: Math.random().toString(),
          x: Math.random() * 20 - 10,
          y: Math.random() * 20 - 10
        }];
        
        // Keep only last 5 particles
        return newParticles.slice(-5);
      });
    }, 100);

    return () => clearInterval(particleInterval);
  }, []);

  const currentX = startX + (endX - startX) * (progress / 100);
  const currentY = startY + (endY - startY) * (progress / 100);

  const getPacketInfo = () => {
    switch (packet.type) {
      case 'ARP_REQUEST':
        return `Who has ${packet.targetIP}? Tell ${packet.sourceIP}`;
      case 'ARP_REPLY':
        return `${packet.sourceIP} is at ${packet.sourceMAC}`;
      case 'RARP_REQUEST':
        return `Who am I? My MAC is ${packet.sourceMAC}`;
      case 'RARP_REPLY':
        return `You are ${packet.targetIP}`;
      default:
        return 'Network Packet';
    }
  };

  return (
    <motion.div
      className={`absolute z-30 ${className}`}
      style={{
        left: currentX,
        top: currentY,
        transform: 'translate(-50%, -50%)'
      }}
      variants={packetAnimation}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {/* Main Packet */}
      <motion.div
        className={`
          relative w-12 h-12 md:w-16 md:h-16
          border-2 rounded-full
          ${getPacketColor()}
          flex items-center justify-center
          backdrop-blur-sm
          shadow-2xl
        `}
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360]
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {/* Packet Icon */}
        <div className="text-lg md:text-xl">
          {getPacketIcon()}
        </div>

        {/* Glow Effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-spin-slow" />
        
        {/* Progress Ring */}
        <svg className="absolute inset-0 w-full h-full transform -rotate-90">
          <circle
            cx="50%"
            cy="50%"
            r="45%"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeDasharray={`${2 * Math.PI * 45}`}
            strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}`}
            className="text-cyber-blue opacity-50"
          />
        </svg>
      </motion.div>

      {/* Trailing Particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-1 h-1 bg-cyber-blue rounded-full"
          style={{
            left: particle.x,
            top: particle.y
          }}
          animate={{
            scale: [1, 0],
            opacity: [1, 0]
          }}
          transition={{
            duration: 0.5,
            ease: "easeOut"
          }}
        />
      ))}

      {/* Packet Data Tooltip */}
      <motion.div
        className="absolute -top-16 left-1/2 transform -translate-x-1/2
                   bg-dark-bg border border-cyber-blue rounded-lg p-2
                   opacity-0 hover:opacity-100 transition-opacity duration-300
                   z-40 min-w-max"
        initial={{ opacity: 0, y: 10 }}
        whileHover={{ opacity: 1, y: 0 }}
      >
        <div className="text-xs font-mono space-y-1">
          <div className="text-cyber-blue font-bold">{packet.type}</div>
          <div className="text-cyber-green">From: {packet.sourceIP}</div>
          {packet.targetIP && (
            <div className="text-cyber-purple">To: {packet.targetIP}</div>
          )}
          <div className="text-xs text-gray-300">{getPacketInfo()}</div>
        </div>
        
        {/* Tooltip Arrow */}
        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2
                        w-2 h-2 bg-dark-bg border-l border-b border-cyber-blue rotate-45" />
      </motion.div>

      {/* Network Path Trail */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{
          width: Math.abs(endX - startX) + 100,
          height: Math.abs(endY - startY) + 100,
          left: Math.min(startX, endX) - 50,
          top: Math.min(startY, endY) - 50,
          transform: 'none'
        }}
      >
        <motion.path
          d={`M ${startX - Math.min(startX, endX) + 50} ${startY - Math.min(startY, endY) + 50} 
              Q ${(startX + endX) / 2 - Math.min(startX, endX) + 50} ${Math.min(startY, endY) - 100} 
              ${endX - Math.min(startX, endX) + 50} ${endY - Math.min(startY, endY) + 50}`}
          stroke="url(#packetGradient)"
          strokeWidth="2"
          fill="none"
          strokeDasharray="5,5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.6 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
        <defs>
          <linearGradient id="packetGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00ffff" stopOpacity="0" />
            <stop offset="50%" stopColor="#00ffff" stopOpacity="1" />
            <stop offset="100%" stopColor="#00ffff" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </motion.div>
  );
};

export default PacketAnimation;
