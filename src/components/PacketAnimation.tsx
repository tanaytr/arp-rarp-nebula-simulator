import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Packet          className={`
          relative w-10 h-10
          flex items-center justify-center
          rounded-lg border-2 ${styles.border}
          bg-gradient-to-br ${styles.gradient}
          ${styles.glow}
          backdrop-blur-sm '../types';

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
      case 'ARP_REQUEST': return '📡';
      case 'ARP_REPLY': return '✅';
      case 'RARP_REQUEST': return '🔍';
      case 'RARP_REPLY': return '🎯';
      default: return '📦';
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