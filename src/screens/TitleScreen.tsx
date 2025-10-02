import React from 'react';
import { motion } from 'framer-motion';
import ParticleSystem from '../components/ParticleSystem';
import { fadeInUp, scaleIn, glowEffect } from '../utils/animations';

interface TitleScreenProps {
  onBeginSimulation: () => void;
}

const TitleScreen: React.FC<TitleScreenProps> = ({ onBeginSimulation }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-bg via-darker-bg to-card-bg overflow-hidden relative">
      {/* Background Effects */}
      <ParticleSystem count={100} />
      
      {/* Animated Grid Background */}
      <div className="absolute inset-0 bg-cyber-grid bg-[size:50px_50px] opacity-10" />
      
      {/* Floating Orbs */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={`orb-${i}`}
          className="absolute w-32 h-32 rounded-full opacity-20"
          style={{
            background: `radial-gradient(circle, ${
              ['#00ffff', '#ff00ff', '#00ff00', '#ff8000', '#ff1493'][i]
            } 0%, transparent 70%)`,
            left: `${20 + i * 15}%`,
            top: `${10 + (i % 2) * 60}%`
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-8">
        {/* Title */}
        <motion.div
          className="text-center mb-16"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.5 }}
        >
          <motion.h1
            className="text-4xl md:text-6xl lg:text-8xl font-cyber font-black mb-6
                       bg-gradient-to-r from-cyber-blue via-cyber-purple to-cyber-green
                       bg-clip-text text-transparent"
            variants={glowEffect}
            initial="initial"
            animate="animate"
          >
            ARP & RARP
          </motion.h1>
          
          <motion.h2
            className="text-2xl md:text-4xl lg:text-5xl font-cyber font-bold mb-4 text-cyber-blue"
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ delay: 1 }}
          >
            Nebula Simulator
          </motion.h2>
          
          <motion.p
            className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed"
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ delay: 1.5 }}
          >
            Explore the mysteries of network protocols through interactive simulations
            in a futuristic cyberpunk universe
          </motion.p>
          
          <motion.div
            className="mt-4 text-sm text-cyber-blue/70 max-w-xl mx-auto"
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ delay: 1.7 }}
          >
            <p className="mb-2">📡 <strong>ARP (Address Resolution Protocol):</strong> Resolves IP addresses to MAC addresses</p>
            <p className="mb-2">🔍 <strong>RARP (Reverse Address Resolution Protocol):</strong> Assigns IP addresses to MAC addresses</p>
            <p>🎮 <strong>Interactive Learning:</strong> Step-by-step guided experience with visual animations</p>
          </motion.div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 max-w-4xl"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ delay: 2 }}
        >
          {[
            {
              icon: '📡',
              title: 'ARP Protocol',
              description: 'IP to MAC address resolution'
            },
            {
              icon: '🔍',
              title: 'RARP Protocol',
              description: 'MAC to IP address assignment'
            },
            {
              icon: '🎮',
              title: 'Interactive Learning',
              description: 'Step-by-step guided experience'
            }
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              className="bg-gradient-to-br from-card-bg/50 to-darker-bg/50
                         border border-cyber-blue/30 rounded-xl p-6
                         backdrop-blur-sm text-center"
              variants={scaleIn}
              initial="initial"
              animate="animate"
              transition={{ delay: 2 + index * 0.2 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-cyber font-bold text-cyber-blue mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-300 text-sm">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Begin Button */}
        <motion.button
          onClick={onBeginSimulation}
          className="relative px-12 py-6 bg-gradient-to-r from-cyber-blue to-cyber-purple
                     border-2 border-cyber-blue rounded-xl
                     font-cyber font-bold text-xl text-white
                     hover:shadow-2xl transition-all duration-300
                     backdrop-blur-sm group"
          variants={scaleIn}
          initial="initial"
          animate="animate"
          transition={{ delay: 2.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Button Glow Effect */}
          <motion.div
            className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyber-blue to-cyber-purple opacity-0 group-hover:opacity-20 transition-opacity duration-300"
            animate={{
              boxShadow: [
                "0 0 20px rgba(0, 255, 255, 0.5)",
                "0 0 40px rgba(0, 255, 255, 0.8), 0 0 60px rgba(255, 0, 255, 0.4)",
                "0 0 20px rgba(0, 255, 255, 0.5)"
              ]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          <div className="relative flex items-center space-x-3">
            <span className="text-2xl">🚀</span>
            <span>Begin Simulation</span>
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </div>
        </motion.button>

        {/* Loading Animation */}
        <motion.div
          className="mt-8 flex items-center space-x-2 text-cyber-blue"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ delay: 3 }}
        >
          <div className="text-sm font-mono">Initializing Network Protocols</div>
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-cyber-blue rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2
              }}
            />
          ))}
        </motion.div>

        {/* Instructions */}
        <motion.div
          className="mt-6 text-center"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ delay: 3.5 }}
        >
          <div className="text-sm text-gray-400 max-w-md mx-auto">
            <p className="mb-2">💡 <strong>How to use:</strong></p>
            <p>1. Click "Begin Simulation" to start</p>
            <p>2. Select a protocol mode (ARP or RARP)</p>
            <p>3. Choose a device and follow the guidance</p>
            <p>4. Watch the animated packet transfers</p>
          </div>
        </motion.div>
      </div>

      {/* Corner Decorations */}
      <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-cyber-blue opacity-50" />
      <div className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-cyber-blue opacity-50" />
      <div className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-cyber-blue opacity-50" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-cyber-blue opacity-50" />

      {/* Creators Credit */}
      <motion.div
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center"
        variants={fadeInUp}
        initial="initial"
        animate="animate"
        transition={{ delay: 4 }}
      >
        <div className="text-xs text-gray-500 font-mono">
          A Simulation Created By{' '}
          <span className="text-cyber-blue">Tanay Trivedi</span>,{' '}
          <span className="text-cyber-purple">Priyansh Saxena</span>,{' '}
          <span className="text-cyber-green">Srishti Jain</span> &{' '}
          <span className="text-cyber-orange">Diksha Rathi</span>
        </div>
      </motion.div>
    </div>
  );
};

export default TitleScreen;
