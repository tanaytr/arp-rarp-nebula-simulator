import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Packet } from '../types';

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
  const [position, setPosition] = useState({ x: startX, y: startY });
  const [isAnimating, setIsAnimating] = useState(true);

  const getPacketIcon = () => {
    switch (packet.type) {
      case 'ARP_REQUEST':
        return (
          <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current text-cyber-blue">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
            <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"/>
          </svg>
        );
      case 'ARP_REPLY':
        return (
          <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current text-cyber-success">
            <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
          </svg>
        );
      case 'RARP_REQUEST':
        return (
          <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current text-cyber-warning">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm0-4h-2V7h2v8z"/>
          </svg>
        );
      case 'RARP_REPLY':
        return (
          <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current text-cyber-accent">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
        );
      default:
        return (
          <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
            <path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z"/>
          </svg>
        );
    }
  };

  const getPacketStyles = () => {
    switch (packet.type) {
      case 'ARP_REQUEST':
        return {
          border: 'border-cyber-blue',
          gradient: 'from-cyber-blue/20 to-cyber-purple/20',
          glow: 'shadow-[0_0_15px_rgba(0,255,255,0.5)]'
        };
      case 'ARP_REPLY':
        return {
          border: 'border-cyber-green',
          gradient: 'from-cyber-green/20 to-cyber-blue/20',
          glow: 'shadow-[0_0_15px_rgba(0,255,0,0.5)]'
        };
      case 'RARP_REQUEST':
        return {
          border: 'border-cyber-orange',
          gradient: 'from-cyber-orange/20 to-cyber-purple/20',
          glow: 'shadow-[0_0_15px_rgba(255,165,0,0.5)]'
        };
      case 'RARP_REPLY':
        return {
          border: 'border-neon-pink',
          gradient: 'from-neon-pink/20 to-cyber-purple/20',
          glow: 'shadow-[0_0_15px_rgba(255,0,255,0.5)]'
        };
      default:
        return {
          border: 'border-cyber-purple',
          gradient: 'from-cyber-purple/20 to-cyber-blue/20',
          glow: 'shadow-[0_0_15px_rgba(128,0,255,0.5)]'
        };
    }
  };

  useEffect(() => {
    const duration = 2000; // 2 seconds for the animation
    const startTime = Date.now();
    
    const animationFrame = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const newX = startX + (endX - startX) * progress;
      const newY = startY + (endY - startY) * progress;
      setPosition({ x: newX, y: newY });
      
      if (progress < 1) {
        requestAnimationFrame(animationFrame);
      } else {
        setIsAnimating(false);
        setTimeout(() => {
          onComplete();
        }, 500);
      }
    };

    requestAnimationFrame(animationFrame);
  }, [startX, startY, endX, endY, onComplete]);

  const styles = getPacketStyles();

  return (
    <motion.div
      className={`absolute ${className}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
      }}
    >
      <motion.div
        className={`
          relative w-8 h-8
          flex items-center justify-center
          rounded-lg border-2 ${styles.border}
          bg-gradient-to-br ${styles.gradient}
          ${styles.glow}
          backdrop-blur-sm
        `}
        initial={{ scale: 0, rotate: 0 }}
        animate={{ 
          scale: isAnimating ? 1 : [1, 1.5, 0],
          rotate: 360
        }}
        transition={{ 
          scale: { duration: 0.5 },
          rotate: { duration: 2, repeat: Infinity, ease: "linear" }
        }}
      >
        <span className="text-lg">{getPacketIcon()}</span>
        
        {/* Glowing trail effect */}
        <motion.div
          className={`absolute -inset-1 rounded-xl ${styles.border} opacity-50`}
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.2, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </motion.div>

      {/* Particle trail */}
      <motion.div
        className={`absolute -inset-2 rounded-xl ${styles.border} opacity-30`}
        animate={{ scale: [1, 1.5], opacity: [0.3, 0] }}
        transition={{ duration: 1, repeat: Infinity }}
      />
    </motion.div>
  );
};

export default PacketAnimation;