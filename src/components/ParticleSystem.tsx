import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Particle } from '../types';

interface ParticleSystemProps {
  count?: number;
  className?: string;
}

const ParticleSystem: React.FC<ParticleSystemProps> = ({
  count = 50,
  className = ''
}) => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const createParticles = () => {
      const newParticles: Particle[] = [];
      
      for (let i = 0; i < count; i++) {
        newParticles.push({
          id: `particle-${i}`,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          life: Math.random() * 100,
          maxLife: 100,
          color: ['#00ffff', '#ff00ff', '#00ff00', '#ff8000'][Math.floor(Math.random() * 4)]
        });
      }
      
      setParticles(newParticles);
    };

    createParticles();

    const animate = () => {
      setParticles(prev => prev.map(particle => {
        let newX = particle.x + particle.vx;
        let newY = particle.y + particle.vy;
        let newLife = particle.life - 0.5;
        let newVx = particle.vx;
        let newVy = particle.vy;

        // Bounce off edges
        if (newX <= 0 || newX >= window.innerWidth) {
          newVx = -newVx;
          newX = Math.max(0, Math.min(window.innerWidth, newX));
        }
        if (newY <= 0 || newY >= window.innerHeight) {
          newVy = -newVy;
          newY = Math.max(0, Math.min(window.innerHeight, newY));
        }

        // Reset life when it reaches 0
        if (newLife <= 0) {
          newLife = particle.maxLife;
          newX = Math.random() * window.innerWidth;
          newY = Math.random() * window.innerHeight;
        }

        return {
          ...particle,
          x: newX,
          y: newY,
          vx: newVx,
          vy: newVy,
          life: newLife
        };
      }));
    };

    const interval = setInterval(animate, 50);
    return () => clearInterval(interval);
  }, [count]);

  return (
    <div className={`fixed inset-0 pointer-events-none z-0 ${className}`}>
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          className="absolute w-1 h-1 rounded-full"
          style={{
            left: particle.x,
            top: particle.y,
            backgroundColor: particle.color,
            opacity: particle.life / particle.maxLife
          }}
          animate={{
            scale: [0.5, 1, 0.5],
            opacity: [0.3, 0.8, 0.3]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

export default ParticleSystem;
