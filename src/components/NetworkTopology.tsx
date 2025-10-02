import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Device } from '../types';
import DevicePod from './DevicePod';

interface NetworkTopologyProps {
  devices: Device[];
  selectedDevice: Device | null;
  onDeviceSelect: (device: Device) => void;
  animatingDevice?: Device | null;
  className?: string;
}

const NetworkTopology: React.FC<NetworkTopologyProps> = ({
  devices,
  selectedDevice,
  onDeviceSelect,
  animatingDevice,
  className = ''
}) => {
  const calculateDevicePositions = () => {
    const boxWidth = window.innerWidth;
    const boxHeight = Math.max(window.innerHeight * 0.7, 600);
    const centerX = Math.round(boxWidth / 2);
    const centerY = Math.round(boxHeight / 2);
    const deviceOffset = 40;

    const minDimension = Math.min(boxWidth, boxHeight);
    const radius = Math.round(minDimension * 0.3);

    const hub = devices.find(d => d.type === 'hub');
    const computers = devices.filter(d => d.type === 'computer');

    if (hub) {
      hub.x = centerX - deviceOffset;
      hub.y = centerY - deviceOffset;
    }

    computers.forEach((device, index) => {
      const angle = ((index * 2 * Math.PI) / computers.length) + Math.PI / 2;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      device.x = Math.round(x - deviceOffset);
      device.y = Math.round(y - deviceOffset);
    });

    return { centerX, centerY, computers, hub };
  };

  const renderConnectionLines = () => {
    const { centerX, centerY, computers } = calculateDevicePositions();
    return computers.map((device, index) => {
      const deviceCenterX = device.x! + 40;
      const deviceCenterY = device.y! + 40;
      const isActive = selectedDevice?.id === device.id || animatingDevice?.id === device.id;
      
      return (
        <motion.line
          key={`connection-${device.id}`}
          x1={deviceCenterX}
          y1={deviceCenterY}
          x2={centerX}
          y2={centerY}
          stroke={isActive ? "url(#activeConnectionGradient)" : "url(#connectionGradient)"}
          strokeWidth={isActive ? "4" : "2"}
          strokeDasharray={isActive ? "none" : "4,4"}
          filter={isActive ? "url(#glow)" : "none"}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ 
            pathLength: 1,
            opacity: isActive ? 1 : 0.4,
            strokeDashoffset: isActive ? [-50, 0] : 0
          }}
          transition={{ 
            duration: isActive ? 0.5 : 1,
            delay: index * 0.1,
            ease: "easeOut",
            strokeDashoffset: {
              duration: 2,
              repeat: Infinity,
              ease: "linear"
            }
          }}
        />
      );
    });
  };

  useEffect(() => {
    const handleResize = () => calculateDevicePositions();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={`w-full h-full bg-opacity-50 bg-black ${className}`}>
      <div className="relative w-full h-full max-w-5xl mx-auto">
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <defs>
            <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00ffff" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#00ffff" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#00ffff" stopOpacity="0.3" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          {renderConnectionLines()}
        </svg>

        <motion.div
          className="absolute w-16 h-16 md:w-20 md:h-20
                     bg-gradient-to-br from-cyber-blue/30 to-cyber-purple/30
                     border-2 border-cyber-blue rounded-xl
                     flex items-center justify-center
                     backdrop-blur-sm shadow-lg z-10"
          style={{
            left: `calc(50% - 32px)`,
            top: `calc(50% - 32px)`
          }}
          animate={{
            scale: [1, 1.05, 1],
            boxShadow: [
              "0 0 10px rgba(0, 255, 255, 0.5)",
              "0 0 20px rgba(0, 255, 255, 0.8)",
              "0 0 10px rgba(0, 255, 255, 0.5)"
            ]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="text-2xl md:text-3xl">🌐</div>
          <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2
                          text-xs font-cyber text-cyber-blue whitespace-nowrap">
            Network Hub
          </div>
        </motion.div>

        {devices.map((device) => (
          <DevicePod
            key={device.id}
            device={device}
            isSelected={selectedDevice?.id === device.id}
            isAnimating={animatingDevice?.id === device.id}
            onClick={() => onDeviceSelect(device)}
            className="absolute"
            style={{
              left: device.x,
              top: device.y
            }}
          />
        ))}

        <div className="absolute inset-0 bg-cyber-grid bg-[size:50px_50px] opacity-5 pointer-events-none" />
      </div>
    </div>
  );
};

export default NetworkTopology;