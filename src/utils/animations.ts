// Animation utility functions for Framer Motion

export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 }
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.8 }
};

export const slideInLeft = {
  initial: { opacity: 0, x: -50 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 50 }
};

export const slideInRight = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -50 }
};

export const bounceIn = {
  initial: { opacity: 0, scale: 0.3 },
  animate: { 
    opacity: 1, 
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 10
    }
  },
  exit: { opacity: 0, scale: 0.3 }
};

export const glowEffect = {
  initial: { 
    boxShadow: "0 0 5px #00ffff",
    textShadow: "0 0 5px #00ffff"
  },
  animate: { 
    boxShadow: "0 0 20px #00ffff, 0 0 30px #00ffff",
    textShadow: "0 0 10px #00ffff, 0 0 20px #00ffff",
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatType: "reverse" as const
    }
  }
};

export const packetAnimation = {
  initial: { scale: 0, opacity: 0 },
  animate: { 
    scale: [0, 1.2, 1],
    opacity: [0, 1, 1],
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  },
  exit: { 
    scale: 0, 
    opacity: 0,
    transition: {
      duration: 0.3
    }
  }
};

export const networkPath = (startX: number, startY: number, endX: number, endY: number) => {
  return {
    initial: { pathLength: 0, opacity: 0 },
    animate: { 
      pathLength: 1, 
      opacity: 1,
      transition: {
        duration: 2,
        ease: "easeInOut"
      }
    },
    exit: { 
      pathLength: 0, 
      opacity: 0,
      transition: {
        duration: 0.5
      }
    }
  };
};

export const particleBurst = {
  initial: { scale: 0, opacity: 1 },
  animate: { 
    scale: [0, 1.5, 0],
    opacity: [1, 0.8, 0],
    transition: {
      duration: 1,
      ease: "easeOut"
    }
  }
};

export const deviceGlow = {
  initial: { 
    boxShadow: "0 0 10px rgba(0, 255, 255, 0.3)",
    borderColor: "rgba(0, 255, 255, 0.5)"
  },
  animate: { 
    boxShadow: "0 0 20px rgba(0, 255, 255, 0.8), 0 0 40px rgba(0, 255, 255, 0.4)",
    borderColor: "rgba(0, 255, 255, 1)",
    transition: {
      duration: 1,
      repeat: Infinity,
      repeatType: "reverse" as const
    }
  }
};
