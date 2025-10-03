/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'terminal-green': '#00FF00',
        'terminal-blue': '#007ACC',
        'cyber-black': '#0D0D0D',
        'cyber-darker': '#080808',
        'cyber-blue': '#00A8FF',
        'cyber-accent': '#FF0055',
        'cyber-yellow': '#FFB800',
        'cyber-success': '#00FF9F',
        'cyber-error': '#FF0044',
        'cyber-warning': '#FFB800',
        'grid-line': 'rgba(255, 255, 255, 0.05)',
        'panel-bg': 'rgba(13, 13, 13, 0.8)',
        'panel-border': 'rgba(255, 255, 255, 0.1)',
        'glow-blue': 'rgba(0, 168, 255, 0.2)',
        'glow-red': 'rgba(255, 0, 85, 0.2)',
      },
      fontFamily: {
        'display': ['Rajdhani', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
        'interface': ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'grid-pattern': 'linear-gradient(to right, var(--grid-line) 1px, transparent 1px), linear-gradient(to bottom, var(--grid-line) 1px, transparent 1px)',
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
        'scan': 'scan 2s ease-in-out infinite',
        'data-stream': 'data-stream 20s linear infinite',
        'flicker': 'flicker 0.5s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { 
            boxShadow: '0 0 5px #00ffff, 0 0 10px #00ffff, 0 0 15px #00ffff',
            textShadow: '0 0 10px #00ffff'
          },
          '100%': { 
            boxShadow: '0 0 10px #00ffff, 0 0 20px #00ffff, 0 0 30px #00ffff',
            textShadow: '0 0 20px #00ffff, 0 0 30px #00ffff'
          }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        warp: {
          '0%': { transform: 'scale(1) rotate(0deg)', opacity: '1' },
          '50%': { transform: 'scale(1.2) rotate(180deg)', opacity: '0.7' },
          '100%': { transform: 'scale(1) rotate(360deg)', opacity: '1' }
        }
      },
      backgroundImage: {
        'cyber-grid': 'linear-gradient(rgba(0,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,255,0.1) 1px, transparent 1px)',
        'neon-gradient': 'linear-gradient(45deg, #00ffff, #ff00ff, #00ff00)',
        'dark-gradient': 'linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 50%, #16213e 100%)',
      }
    },
  },
  plugins: [],
}
