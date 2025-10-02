import { Device } from '../types';

export const generateRandomMAC = (): string => {
  const hex = '0123456789ABCDEF';
  let mac = '';
  for (let i = 0; i < 6; i++) {
    if (i > 0) mac += ':';
    mac += hex[Math.floor(Math.random() * 16)] + hex[Math.floor(Math.random() * 16)];
  }
  return mac;
};

export const generateRandomIP = (): string => {
  return `192.168.${Math.floor(Math.random() * 255) + 1}.${Math.floor(Math.random() * 254) + 1}`;
};

export const defaultDevices: Device[] = [
  {
    id: 'device-1',
    name: 'Alpha Terminal',
    ip: '192.168.1.10',
    mac: '00:1A:2B:3C:4D:5E',
    x: 50,
    y: 80,
    isActive: false,
    isOnline: true,
    type: 'computer'
  },
  {
    id: 'device-hub',
    name: 'Network Hub',
    ip: '192.168.1.1',
    mac: 'FF:FF:FF:FF:FF:FF',
    x: 300,
    y: 280,
    isActive: false,
    isOnline: true,
    type: 'hub'
  },
  {
    id: 'device-2',
    name: 'Beta Station',
    ip: '192.168.1.20',
    mac: 'AA:BB:CC:DD:EE:FF',
    x: 50,
    y: 160,
    isActive: false,
    isOnline: true,
    type: 'computer'
  },
  {
    id: 'device-3',
    name: 'Gamma Node',
    ip: '192.168.1.30',
    mac: '11:22:33:44:55:66',
    x: 50,
    y: 240,
    isActive: false,
    isOnline: true,
    type: 'computer'
  },
  {
    id: 'device-4',
    name: 'Delta Hub',
    type: 'hub',
    ip: '192.168.1.40',
    mac: '77:88:99:AA:BB:CC',
    x: 50,
    y: 320,
    isActive: false,
    isOnline: true
  },
  {
    id: 'device-5',
    name: 'Epsilon Router',
    ip: '192.168.1.50',
    mac: 'DD:EE:FF:00:11:22',
    x: 50,
    y: 400,
    isActive: false,
    isOnline: true,
    type: 'computer'
  },
  {
    id: 'device-6',
    name: 'Zeta Server',
    ip: '192.168.1.60',
    mac: '33:44:55:66:77:88',
    x: 50,
    y: 480,
    isActive: false,
    isOnline: true,
    type: 'computer'
  }
];

export const saveDevicesToStorage = (devices: Device[]): void => {
  localStorage.setItem('arp-rarp-devices', JSON.stringify(devices));
};

export const loadDevicesFromStorage = (): Device[] => {
  const stored = localStorage.getItem('arp-rarp-devices');
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (error) {
      console.error('Error loading devices from storage:', error);
    }
  }
  return defaultDevices;
};

export const generateRandomNebula = (): Device[] => {
  const devices: Device[] = [];
  const names = ['Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon', 'Zeta', 'Theta', 'Lambda'];
  const types = ['Terminal', 'Station', 'Node', 'Hub', 'Router', 'Server', 'Gateway', 'Proxy'];

  for (let i = 0; i < 6; i++) {
    const name = `${names[i]} ${types[i]}`;
    const x = 100; // All devices aligned vertically on the left
    const y = 100 + (i * 100); // Spaced 100px apart vertically
    
    devices.push({
      id: `device-${i + 1}`,
      name,
      ip: generateRandomIP(),
      mac: generateRandomMAC(),
      x,
      y,
      isActive: false,
      isOnline: true,
      type: 'computer'
    });
  }

  return devices;
};
