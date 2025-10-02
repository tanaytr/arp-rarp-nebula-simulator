import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TitleScreen from './screens/TitleScreen';
import SimulationScreen from './screens/SimulationScreen';
import ErrorBoundary from './components/ErrorBoundary';
import './App.css';

type Screen = 'title' | 'simulation';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('title');

  const handleBeginSimulation = () => {
    setCurrentScreen('simulation');
  };

  const handleBackToTitle = () => {
    setCurrentScreen('title');
  };

  return (
    <ErrorBoundary>
      <div className="App">
        <AnimatePresence mode="wait">
          {currentScreen === 'title' ? (
            <motion.div
              key="title"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
            >
              <TitleScreen onBeginSimulation={handleBeginSimulation} />
            </motion.div>
          ) : (
            <motion.div
              key="simulation"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
            >
              <SimulationScreen onBackToTitle={handleBackToTitle} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ErrorBoundary>
  );
};

export default App;
