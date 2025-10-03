import React, { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Device } from '../types';
import DevicePod from './DevicePod';
import ConnectionGradients from './ActiveConnectionStyles';

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
  const svgRef = useRef<SVGSVGElement>(null);
  const gridControls = useAnimation();
  
  useEffect(() => {
    const interval = setInterval(() => {
      gridControls.start({
        opacity: [0.2, 0.4, 0.2],
        transition: { duration: 2, ease: "easeInOut" }
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const calculateDevicePositions = () => {
    const boxWidth = 800;  // Increased size
    const boxHeight = 600;
    const centerX = boxWidth / 2;
    const centerY = boxHeight / 2;
    const deviceOffset = 40; // Adjusted for new device size

    // Find hub and computers
    const hub = devices.find(d => d.type === 'hub');
    const computers = devices.filter(d => d.type === 'computer');

    // Place hub in the center
    if (hub) {
      hub.x = centerX - deviceOffset;
      hub.y = centerY - deviceOffset;
    }

    // Place computers in a circle
    const radius = Math.min(boxWidth, boxHeight) * 0.35; // 35% of the smaller dimension
    computers.forEach((device, index) => {
      const angle = (index * 2 * Math.PI) / computers.length - Math.PI / 2; // Start from top
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);

      device.x = x - deviceOffset;
      device.y = y - deviceOffset;
    });

    return { centerX, centerY, computers, hub };
  };

  const renderConnectionLines = () => {
    const { centerX, centerY, computers } = calculateDevicePositions();
    const connections: JSX.Element[] = [];

    // Draw connections from each computer to the hub
    computers.forEach((device, index) => {
      const deviceCenterX = device.x! + 48; // Add offset to get center
      const deviceCenterY = device.y! + 48;
      const isActive = selectedDevice?.id === device.id || animatingDevice?.id === device.id;
      
      connections.push(
        <motion.line
          key={`connection-${device.id}`}
          x1={deviceCenterX}
          y1={deviceCenterY}
          x2={centerX}
          y2={centerY}
          stroke={isActive ? "url(#activeConnectionGradient)" : "url(#connectionGradient)"}
          strokeWidth={isActive ? "4" : "2"}
          strokeDasharray={isActive ? "none" : "5,5"}
          filter={isActive ? "url(#glow)" : "none"}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ 
            pathLength: 1,
            opacity: isActive ? 1 : 0.4,
            strokeDashoffset: isActive ? [0, 100] : 0
          }}
          transition={{ 
            duration: isActive ? 1.5 : 1,
            delay: index * 0.2,
            ease: "easeInOut",
            strokeDashoffset: {
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }
          }}
        />
      );
    });

    return connections;
  };

  return (
    <div className={`relative w-full h-full ${className}`}>
      {/* Network SVG Overlay */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <defs>
          <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00ffff" stopOpacity="0" />
            <stop offset="50%" stopColor="#00ffff" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#ff00ff" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="interConnectionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00ff00" stopOpacity="0" />
            <stop offset="50%" stopColor="#00ff00" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#ff8000" stopOpacity="0" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {renderConnectionLines()}
      </svg>

      {/* Central Hub */}
      <motion.div
        className="absolute w-20 h-20 md:w-24 md:h-24
                   bg-gradient-to-br from-cyber-blue/30 to-cyber-purple/30
                   border-3 border-cyber-blue rounded-full
                   flex items-center justify-center
                   backdrop-blur-sm shadow-2xl z-10"
        style={{
          left: 300 - 40, // Fixed position - center of network area
          top: 280 - 40   // Fixed position - center of network area
        }}
        animate={{
          scale: [1, 1.1, 1],
          boxShadow: [
            "0 0 20px rgba(0, 255, 255, 0.8)",
            "0 0 40px rgba(0, 255, 255, 1), 0 0 60px rgba(0, 255, 255, 0.6)",
            "0 0 20px rgba(0, 255, 255, 0.8)"
          ]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="text-3xl md:text-4xl">🌐</div>
        
        {/* Rotating ring */}
        <motion.div
          className="absolute inset-0 border-2 border-cyber-blue rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Hub label */}
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2
                        text-xs font-cyber font-bold text-cyber-blue
                        bg-dark-bg/80 px-2 py-1 rounded border border-cyber-blue/50">
          Network Hub
        </div>
      </motion.div>

      {/* Device Pods */}
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

      {/* Network Grid Background */}
      <div className="absolute inset-0 bg-cyber-grid bg-[size:50px_50px] opacity-5 pointer-events-none" />
      
      {/* Floating Data Streams */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`stream-${i}`}
          className="absolute w-1 h-20 bg-gradient-to-b from-transparent via-cyber-blue to-transparent opacity-30"
          style={{
            left: Math.random() * window.innerWidth,
            top: Math.random() * window.innerHeight
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 0.8, 0]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: i * 1.5,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

export default NetworkTopology;
