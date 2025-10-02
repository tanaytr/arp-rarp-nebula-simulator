import React from 'react';
import { motion } from 'framer-motion';
import { slideInLeft } from '../utils/animations';

interface GuidanceBoxProps {
  title: string;
  message: string;
  type?: 'info' | 'success' | 'warning' | 'error';
  isVisible: boolean;
  onClose?: () => void;
  className?: string;
}

const GuidanceBox: React.FC<GuidanceBoxProps> = ({
  title,
  message,
  type = 'info',
  isVisible,
  onClose,
  className = ''
}) => {
  if (!isVisible) return null;

  const getTypeStyles = () => {
    switch (type) {
      case 'success':
        return {
          border: 'border-cyber-green',
          bg: 'bg-cyber-green/10',
          icon: '✅',
          titleColor: 'text-cyber-green',
          glow: 'shadow-green-500/50'
        };
      case 'warning':
        return {
          border: 'border-cyber-orange',
          bg: 'bg-cyber-orange/10',
          icon: '⚠️',
          titleColor: 'text-cyber-orange',
          glow: 'shadow-orange-500/50'
        };
      case 'error':
        return {
          border: 'border-cyber-red',
          bg: 'bg-cyber-red/10',
          icon: '❌',
          titleColor: 'text-cyber-red',
          glow: 'shadow-red-500/50'
        };
      default:
        return {
          border: 'border-cyber-blue',
          bg: 'bg-cyber-blue/10',
          icon: 'ℹ️',
          titleColor: 'text-cyber-blue',
          glow: 'shadow-blue-500/50'
        };
    }
  };

  const styles = getTypeStyles();

  return (
    <motion.div
      className={`fixed top-4 right-4 md:top-8 md:right-8 z-50 max-w-[90vw] md:max-w-md ${className}`}
      variants={slideInLeft}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className={`
        relative p-4 md:p-6
        bg-gradient-to-br from-card-bg to-darker-bg
        border-2 rounded-xl backdrop-blur-sm
        ${styles.border} ${styles.bg}
        shadow-2xl ${styles.glow}
        font-cyber
        break-words
      `}>
        {/* Holographic Background */}
        <div className="absolute inset-0 bg-cyber-grid bg-[size:15px_15px] opacity-5 rounded-xl" />
        
        {/* Close Button */}
        {onClose && (
          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="absolute top-2 right-2 w-8 h-8
                       text-gray-400 hover:text-white
                       transition-colors duration-200
                       flex items-center justify-center
                       bg-gray-800/50 rounded-full
                       hover:bg-red-500/20 border border-gray-700
                       z-50"
            aria-label="Close guidance"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            ✕
          </motion.button>
        )}

        {/* Header */}
        <div className="flex items-center space-x-3 mb-3 pr-8">
          <div className="text-2xl flex-shrink-0">
            {styles.icon}
          </div>
          <h3 className={`text-lg md:text-xl font-bold ${styles.titleColor} truncate`}>
            {title}
          </h3>
        </div>

        {/* Message */}
        <div className="text-sm md:text-base text-gray-300 leading-relaxed whitespace-pre-wrap">
          {message}
        </div>

        {/* Animated Border */}
        <motion.div
          className="absolute inset-0 rounded-xl border-2 border-current opacity-30"
          animate={{
            boxShadow: [
              `0 0 10px currentColor`,
              `0 0 20px currentColor, 0 0 30px currentColor`,
              `0 0 10px currentColor`
            ]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Corner Accents */}
        <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-current rounded-tl-xl" />
        <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-current rounded-tr-xl" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-current rounded-bl-xl" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-current rounded-br-xl" />
      </div>
    </motion.div>
  );
};

export default GuidanceBox;
