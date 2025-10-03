/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'cyber': {
          blue: 'rgb(var(--color-cyber-blue) / <alpha-value>)',
          dark: 'rgb(var(--color-cyber-dark) / <alpha-value>)',
          grid: 'rgb(var(--color-cyber-grid) / <alpha-value>)',
          text: 'rgb(var(--color-cyber-text) / <alpha-value>)',
        }
      },
      fontFamily: {
        'cyber': ['CyberFont', 'Orbitron', 'sans-serif'],
        'mono': ['monospace'],
      },
      backgroundImage: {
        'cyber-grid': 'linear-gradient(to right, rgba(var(--color-cyber-grid), 0.3) 1px, transparent 1px), linear-gradient(to bottom, rgba(var(--color-cyber-grid), 0.3) 1px, transparent 1px)',
        'cyber-glow': 'radial-gradient(circle at center, rgba(var(--color-cyber-blue), 0.1) 0%, transparent 70%)',
      },
      animation: {
        'pulse-cyber': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scanline': 'scanline 3s linear infinite',
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        pulse: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.5 },
        },
        scanline: {
          'from': { transform: 'translateY(-100%)' },
          'to': { transform: 'translateY(100%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { 
            boxShadow: '0 0 5px rgba(var(--color-cyber-blue), 0.5)',
            textShadow: '0 0 5px rgba(var(--color-cyber-blue), 0.5)'
          },
          '100%': { 
            boxShadow: '0 0 20px rgba(var(--color-cyber-blue), 0.8)',
            textShadow: '0 0 15px rgba(var(--color-cyber-blue), 0.8)'
          }
        },
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
