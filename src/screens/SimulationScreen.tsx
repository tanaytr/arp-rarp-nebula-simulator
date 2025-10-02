import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Device, Packet, SimulationState, SimulationStep } from '../types';
import NetworkTopology from '../components/NetworkTopology';
import ControlPanel from '../components/ControlPanel';
import GuidanceBox from '../components/GuidanceBox';
import DatabaseModal from '../components/DatabaseModal';
import PacketAnimation from '../components/PacketAnimation';
import ParticleSystem from '../components/ParticleSystem';
import ActivityLog from '../components/ActivityLog';
import ARPCacheTable from '../components/ARPCacheTable';
import { loadDevicesFromStorage, saveDevicesToStorage, generateRandomNebula } from '../utils/database';
import { fadeInUp } from '../utils/animations';

interface SimulationScreenProps {
  onBackToTitle: () => void;
}

const SimulationScreen: React.FC<SimulationScreenProps> = ({ onBackToTitle }) => {
  const [devices, setDevices] = useState<Device[]>(loadDevicesFromStorage());
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
  const [animatingDevice, setAnimatingDevice] = useState<Device | null>(null);
  const [packets, setPackets] = useState<Packet[]>([]);
  const [activities, setActivities] = useState<any[]>([]);
  const [arpCache, setArpCache] = useState<any[]>([]);
  const [simulationState, setSimulationState] = useState<SimulationState>({
    currentMode: null,
    currentStep: 0,
    isRunning: false,
    isComplete: false,
    selectedDevice: null,
    arpCache: {},
    packets: [],
    steps: []
  });

  // Handle post-simulation state
  useEffect(() => {
    if (simulationState.isComplete) {
      setGuidanceMessage({
        title: 'Simulation Complete',
        message: 'The simulation has finished. You can:
- View the ARP cache table
- Check the activity log
- Start a new simulation
- Return to the title screen',
        type: 'success',
        isVisible: true
      });
    }
  }, [simulationState.isComplete]);
  const [showDatabase, setShowDatabase] = useState(false);
  const [guidanceMessage, setGuidanceMessage] = useState<{
    title: string;
    message: string;
    type: 'info' | 'success' | 'warning' | 'error';
    isVisible: boolean;
  }>({
    title: '',
    message: '',
    type: 'info',
    isVisible: false
  });

  // Save devices to localStorage whenever they change
  useEffect(() => {
    saveDevicesToStorage(devices);
  }, [devices]);

  const showGuidance = (title: string, message: string, type: 'info' | 'success' | 'warning' | 'error' = 'info') => {
    setGuidanceMessage({ title, message, type, isVisible: true });
  };

  const hideGuidance = () => {
    setGuidanceMessage(prev => ({ ...prev, isVisible: false }));
  };

  const addActivity = (type: string, message: string, sourceIP?: string, sourceMAC?: string, targetIP?: string, targetMAC?: string) => {
    const activity = {
      id: `activity-${Date.now()}`,
      timestamp: new Date(),
      type,
      message,
      sourceIP,
      sourceMAC,
      targetIP,
      targetMAC
    };
    setActivities(prev => [...prev, activity]);
  };

  const addToARPCache = (ip: string, mac: string, deviceName?: string) => {
    const cacheEntry = {
      ip,
      mac,
      timestamp: new Date(),
      deviceName
    };
    setArpCache(prev => {
      // Remove existing entry if it exists
      const filtered = prev.filter(entry => entry.ip !== ip);
      return [...filtered, cacheEntry];
    });
  };

  const handleModeSelect = (mode: 'ARP' | 'RARP') => {
    setSimulationState(prev => ({
      ...prev,
      currentMode: mode,
      currentStep: 0,
      isRunning: false,
      selectedDevice: null,
      arpCache: {},
      steps: getStepsForMode(mode)
    }));
    setSelectedDevice(null);
    showGuidance(
      `${mode} Mode Selected`,
      `🎯 You have entered the ${mode} Nebula!\n\n${mode === 'ARP' ? 
        '📡 ARP Protocol: IP to MAC Address Resolution\n• Used when a device needs to find the MAC address of another device\n• Essential for local network communication\n• Step 1: Select sender device\n• Step 2: Broadcast ARP request\n• Step 3: Receive MAC address reply\n• Step 4: Update ARP cache' : 
        '🔍 RARP Protocol: MAC to IP Address Assignment\n• Used by diskless devices to get their IP address\n• Reverse of ARP protocol\n• Step 1: Select diskless device\n• Step 2: Send RARP request to server\n• Step 3: Receive IP address assignment\n• Step 4: Update device configuration'}\n\n💡 Next: Click on a device pod to select it!`,
      'success'
    );
  };

  const getStepsForMode = (mode: 'ARP' | 'RARP'): SimulationStep[] => {
    if (mode === 'ARP') {
      return [
        {
          id: 'select-sender',
          title: 'Select Sender Device',
          description: 'Choose the device that will send the ARP request',
          isCompleted: false
        },
        {
          id: 'send-request',
          title: 'Send ARP Request',
          description: 'Broadcast ARP request to find MAC address',
          isCompleted: false
        },
        {
          id: 'receive-reply',
          title: 'Receive ARP Reply',
          description: 'Target device responds with its MAC address',
          isCompleted: false
        },
        {
          id: 'update-cache',
          title: 'Update ARP Cache',
          description: 'Store the IP-MAC mapping in cache',
          isCompleted: false
        }
      ];
    } else {
      return [
        {
          id: 'select-device',
          title: 'Select Diskless Device',
          description: 'Choose a device that needs an IP address',
          isCompleted: false
        },
        {
          id: 'send-rarp-request',
          title: 'Send RARP Request',
          description: 'Request IP address from RARP server',
          isCompleted: false
        },
        {
          id: 'receive-rarp-reply',
          title: 'Receive RARP Reply',
          description: 'Server assigns IP address to device',
          isCompleted: false
        },
        {
          id: 'update-device',
          title: 'Update Device IP',
          description: 'Device now has assigned IP address',
          isCompleted: false
        }
      ];
    }
  };

  const handleDeviceSelect = (device: Device) => {
    if (!simulationState.currentMode || simulationState.isRunning) return;

    setSelectedDevice(device);
    setSimulationState(prev => ({
      ...prev,
      selectedDevice: device
    }));

    const step = simulationState.steps[simulationState.currentStep];
    if (step && (step.id === 'select-sender' || step.id === 'select-device')) {
      // Mark step as completed and move to next
      const updatedSteps = simulationState.steps.map((s, index) => 
        index === simulationState.currentStep ? { ...s, isCompleted: true } : s
      );
      
      setSimulationState(prev => ({
        ...prev,
        steps: updatedSteps,
        currentStep: prev.currentStep + 1
      }));

      showGuidance(
        'Device Selected Successfully!',
        `✅ ${device.name} has been selected as the ${simulationState.currentMode === 'ARP' ? 'sender device' : 'diskless device'}.\n\n📋 Device Details:\n• IP Address: ${device.ip}\n• MAC Address: ${device.mac}\n• Status: ${device.isOnline ? 'Online' : 'Offline'}\n\n${simulationState.currentMode === 'ARP' ? 
          '📡 ARP Next Steps:\n• This device will send an ARP request\n• Looking for another device\'s MAC address\n• Click "Begin ARP Simulation" to start' :
          '🔍 RARP Next Steps:\n• This device needs an IP address\n• Will request from RARP server\n• Click "Begin RARP Simulation" to start'}\n\n💡 Click "Begin ${simulationState.currentMode} Simulation" button to proceed!`,
        'success'
      );
    }
  };

  const handleStartSimulation = () => {
    if (!simulationState.currentMode || !selectedDevice) {
      showGuidance(
        'Selection Required',
        'Please select a device before starting the simulation.',
        'warning'
      );
      return;
    }

    setSimulationState(prev => ({
      ...prev,
      isRunning: true
    }));

    // Start the actual packet animation simulation
    if (simulationState.currentMode === 'ARP') {
      startARPSimulation(selectedDevice);
    } else {
      startRARPSimulation(selectedDevice);
    }

    showGuidance(
      `🚀 ${simulationState.currentMode} Simulation Started!`,
      `🎯 Simulation is now running with ${selectedDevice.name}!\n\n${simulationState.currentMode === 'ARP' ? 
        '📡 ARP Simulation in Progress:\n• Watch for animated packet transfers\n• ARP request will be broadcast to all devices\n• Target device will respond with its MAC address\n• ARP cache will be updated automatically\n• Look for glowing network connections!' :
        '🔍 RARP Simulation in Progress:\n• Watch for animated packet transfers\n• RARP request will be sent to the server\n• Server will assign an IP address\n• Device will be updated with new IP\n• Look for glowing network connections!'}\n\n👀 Keep watching the network topology for animated packets!\n\n💡 The guidance messages will guide you through each step.`,
      'success'
    );
  };

  const startARPSimulation = (senderDevice: Device) => {
    // Find a target device (different from sender)
    const targetDevice = devices.find(d => d.id !== senderDevice.id);
    if (!targetDevice) return;

    // Add activity log entry
    addActivity('ARP_REQUEST', `${senderDevice.name} broadcasting ARP request for ${targetDevice.ip}`, senderDevice.ip, senderDevice.mac, targetDevice.ip);

    // Create ARP request packet
    const arpRequest: Packet = {
      id: `arp-request-${Date.now()}`,
      type: 'ARP_REQUEST',
      sourceIP: senderDevice.ip,
      sourceMAC: senderDevice.mac,
      targetIP: targetDevice.ip,
      isAnimating: true,
      progress: 0
    };

    // Add packet to animation queue
    setPackets(prev => [...prev, arpRequest]);
    setAnimatingDevice(senderDevice);

    // After 2 seconds, create ARP reply
    setTimeout(() => {
      // Add activity log entry for reply
      addActivity('ARP_REPLY', `${targetDevice.name} responding with MAC address`, targetDevice.ip, targetDevice.mac, senderDevice.ip, senderDevice.mac);

      const arpReply: Packet = {
        id: `arp-reply-${Date.now()}`,
        type: 'ARP_REPLY',
        sourceIP: targetDevice.ip,
        sourceMAC: targetDevice.mac,
        targetIP: senderDevice.ip,
        targetMAC: senderDevice.mac,
        isAnimating: true,
        progress: 0
      };

      setPackets(prev => [...prev, arpReply]);
      setAnimatingDevice(targetDevice);

      // After another 2 seconds, update ARP cache and show completion
      setTimeout(() => {
        setAnimatingDevice(null);
        
        // Update ARP cache
        addToARPCache(targetDevice.ip, targetDevice.mac, targetDevice.name);
        addActivity('CACHE_UPDATE', `ARP cache updated: ${targetDevice.ip} → ${targetDevice.mac}`, targetDevice.ip, targetDevice.mac);

        showGuidance(
          '✅ ARP Resolution Complete!',
          `🎉 ARP simulation completed successfully!\n\n📋 Results:\n• ${senderDevice.name} found ${targetDevice.name}'s MAC address\n• IP: ${targetDevice.ip} → MAC: ${targetDevice.mac}\n• ARP cache updated\n• Communication established\n\n💡 You can now try RARP simulation or reset to try again!`,
          'success'
        );
      }, 2000);
    }, 2000);
  };

  const startRARPSimulation = (disklessDevice: Device) => {
    // Add activity log entry
    addActivity('RARP_REQUEST', `${disklessDevice.name} requesting IP address assignment`, '0.0.0.0', disklessDevice.mac);

    // Create RARP request packet
    const rarpRequest: Packet = {
      id: `rarp-request-${Date.now()}`,
      type: 'RARP_REQUEST',
      sourceIP: '0.0.0.0', // Diskless device has no IP
      sourceMAC: disklessDevice.mac,
      isAnimating: true,
      progress: 0
    };

    // Add packet to animation queue
    setPackets(prev => [...prev, rarpRequest]);
    setAnimatingDevice(disklessDevice);

    // After 2 seconds, create RARP reply with assigned IP
    setTimeout(() => {
      const assignedIP = `192.168.1.${Math.floor(Math.random() * 100) + 100}`;
      
      // Add activity log entry for reply
      addActivity('RARP_REPLY', `RARP server assigned IP ${assignedIP} to ${disklessDevice.name}`, assignedIP, disklessDevice.mac);

      const rarpReply: Packet = {
        id: `rarp-reply-${Date.now()}`,
        type: 'RARP_REPLY',
        sourceIP: assignedIP,
        sourceMAC: disklessDevice.mac,
        targetIP: assignedIP,
        isAnimating: true,
        progress: 0
      };

      setPackets(prev => [...prev, rarpReply]);

      // Update device with new IP
      setDevices(prev => prev.map(device => 
        device.id === disklessDevice.id 
          ? { ...device, ip: assignedIP }
          : device
      ));

      // Show completion message after another 2 seconds
      setTimeout(() => {
        setAnimatingDevice(null);
        
        // Add device update activity
        addActivity('DEVICE_UPDATE', `Device ${disklessDevice.name} updated with IP ${assignedIP}`, assignedIP, disklessDevice.mac);

        showGuidance(
          '✅ RARP Assignment Complete!',
          `🎉 RARP simulation completed successfully!\n\n📋 Results:\n• ${disklessDevice.name} received IP address\n• MAC: ${disklessDevice.mac} → IP: ${assignedIP}\n• Device is now online and configured\n• Ready for network communication\n\n💡 You can now try ARP simulation or reset to try again!`,
          'success'
        );
      }, 2000);
    }, 2000);
  };

  const handleReset = () => {
    setSimulationState({
      currentMode: null,
      currentStep: 0,
      isRunning: false,
      selectedDevice: null,
      arpCache: {},
      packets: [],
      steps: []
    });
    setSelectedDevice(null);
    setAnimatingDevice(null);
    setPackets([]);
    setActivities([]);
    setArpCache([]);
    hideGuidance();
  };

  const handleDatabaseAccess = () => {
    setShowDatabase(true);
  };

  const handleUpdateDevices = (newDevices: Device[]) => {
    setDevices(newDevices);
    setShowDatabase(false);
    showGuidance(
      'Database Updated',
      'Network device configuration has been updated successfully.',
      'success'
    );
  };

  const handleGenerateRandom = () => {
    const randomDevices = generateRandomNebula();
    setDevices(randomDevices);
    showGuidance(
      'Random Nebula Generated',
      'A new random network topology has been created with fresh device configurations.',
      'success'
    );
  };

  const handleRunFullDemo = () => {
    showGuidance(
      'Full Demo Starting',
      'Running a complete demonstration of both ARP and RARP protocols with all devices.',
      'info'
    );
    // Implementation for full demo would go here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-bg via-darker-bg to-card-bg relative">
      {/* Background Effects */}
      <ParticleSystem count={30} />
      
      {/* Animated Grid Background */}
      <div className="absolute inset-0 bg-cyber-grid bg-[size:50px_50px] opacity-5" />

      {/* Header */}
      <motion.div
        className="relative z-20 p-4 md:p-6"
        variants={fadeInUp}
        initial="initial"
        animate="animate"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-cyber font-bold text-cyber-blue">
              Network Protocol Simulator
            </h1>
            <div className="text-sm text-gray-400">
              Interactive ARP & RARP Learning Environment
            </div>
          </div>
          
          <button
            onClick={onBackToTitle}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg
                       font-cyber font-bold transition-colors duration-300"
          >
            ← Back to Title
          </button>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-6 gap-6 p-4 md:p-6">
        {/* Network Topology */}
        <div className="lg:col-span-3">
          <NetworkTopology
            devices={devices}
            selectedDevice={selectedDevice}
            onDeviceSelect={handleDeviceSelect}
            animatingDevice={animatingDevice}
            className="bg-gradient-to-br from-card-bg/50 to-darker-bg/50
                       border border-cyber-blue/30 rounded-xl p-4
                       backdrop-blur-sm min-h-[600px]"
          />

          {/* Packet Animations */}
          {packets.map((packet) => {
            const sourceDevice = devices.find(d => d.ip === packet.sourceIP);
            const hubX = 300;
            const hubY = 280;
            
            if (!sourceDevice) return null;

            return (
              <PacketAnimation
                key={packet.id}
                packet={packet}
                startX={sourceDevice.x + 48}
                startY={sourceDevice.y + 48}
                endX={hubX}
                endY={hubY}
                onComplete={() => {
                  setPackets(prev => prev.filter(p => p.id !== packet.id));
                }}
              />
            );
          })}
        </div>

        {/* Control Panel */}
        <div className="lg:col-span-1">
          <ControlPanel
            onModeSelect={handleModeSelect}
            onStartSimulation={handleStartSimulation}
            onReset={handleReset}
            onDatabaseAccess={handleDatabaseAccess}
            onGenerateRandom={handleGenerateRandom}
            onRunFullDemo={handleRunFullDemo}
            currentMode={simulationState.currentMode}
            isSimulationRunning={simulationState.isRunning}
          />
        </div>

        {/* Activity Log and ARP Cache */}
        <div className="lg:col-span-2 space-y-4">
          <ActivityLog activities={activities} />
          <ARPCacheTable cache={arpCache} />
        </div>
      </div>

      {/* Guidance Box */}
      <GuidanceBox
        title={guidanceMessage.title}
        message={guidanceMessage.message}
        type={guidanceMessage.type}
        isVisible={guidanceMessage.isVisible}
        onClose={hideGuidance}
      />

      {/* Database Modal */}
      <DatabaseModal
        devices={devices}
        isOpen={showDatabase}
        onClose={() => setShowDatabase(false)}
        onUpdateDevices={handleUpdateDevices}
      />
    </div>
  );
};

export default SimulationScreen;
