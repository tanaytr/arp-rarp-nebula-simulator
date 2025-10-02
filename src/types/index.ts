export interface Device {
  id: string;
  name: string;
  ip: string;
  mac: string;
  x: number;
  y: number;
  isActive: boolean;
  isOnline: boolean;
  type: 'computer' | 'hub';
  type: 'computer' | 'hub';
}

export interface Packet {
  id: string;
  type: 'ARP_REQUEST' | 'ARP_REPLY' | 'RARP_REQUEST' | 'RARP_REPLY';
  sourceIP: string;
  sourceMAC: string;
  targetIP?: string;
  targetMAC?: string;
  data?: any;
  isAnimating: boolean;
  progress: number;
}

export interface ARPCache {
  [key: string]: string; // IP -> MAC mapping
}

export interface SimulationStep {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  action?: () => void;
}

export interface SimulationState {
  currentMode: 'ARP' | 'RARP' | null;
  currentStep: number;
  isRunning: boolean;
  isComplete: boolean;
  selectedDevice: Device | null;
  arpCache: ARPCache;
  packets: Packet[];
  steps: SimulationStep[];
}

export interface Particle {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
}
