import { Device, Packet, ARPCache } from '../types';

export const createARPPacket = (
  sourceDevice: Device,
  targetIP: string,
  type: 'REQUEST' | 'REPLY'
): Packet => {
  return {
    id: `arp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    type: type === 'REQUEST' ? 'ARP_REQUEST' : 'ARP_REPLY',
    sourceIP: sourceDevice.ip,
    sourceMAC: sourceDevice.mac,
    targetIP: type === 'REPLY' ? undefined : targetIP,
    targetMAC: type === 'REPLY' ? sourceDevice.mac : undefined,
    data: {
      operation: type,
      timestamp: Date.now(),
      protocol: 'ARP'
    },
    isAnimating: true,
    progress: 0
  };
};

export const createRARPPacket = (
  sourceDevice: Device,
  type: 'REQUEST' | 'REPLY',
  assignedIP?: string
): Packet => {
  return {
    id: `rarp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    type: type === 'REQUEST' ? 'RARP_REQUEST' : 'RARP_REPLY',
    sourceIP: assignedIP || '0.0.0.0',
    sourceMAC: sourceDevice.mac,
    targetIP: assignedIP,
    data: {
      operation: type,
      timestamp: Date.now(),
      protocol: 'RARP',
      assignedIP: assignedIP
    },
    isAnimating: true,
    progress: 0
  };
};

export const updateARPCache = (
  cache: ARPCache,
  ip: string,
  mac: string
): ARPCache => {
  return {
    ...cache,
    [ip]: mac
  };
};

export const findDeviceByIP = (devices: Device[], ip: string): Device | null => {
  return devices.find(device => device.ip === ip) || null;
};

export const findDeviceByMAC = (devices: Device[], mac: string): Device | null => {
  return devices.find(device => device.mac === mac) || null;
};

export const getAvailableIP = (devices: Device[], baseIP: string = '192.168.1'): string => {
  let ipCounter = 100;
  let newIP = `${baseIP}.${ipCounter}`;
  
  while (devices.some(device => device.ip === newIP)) {
    ipCounter++;
    newIP = `${baseIP}.${ipCounter}`;
  }
  
  return newIP;
};

export const simulateNetworkDelay = (ms: number = 1000): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

export const getPacketDescription = (packet: Packet): string => {
  switch (packet.type) {
    case 'ARP_REQUEST':
      return `Who has ${packet.targetIP}? Tell ${packet.sourceIP}`;
    case 'ARP_REPLY':
      return `${packet.sourceIP} is at ${packet.sourceMAC}`;
    case 'RARP_REQUEST':
      return `Who am I? My MAC is ${packet.sourceMAC}`;
    case 'RARP_REPLY':
      return `You are ${packet.targetIP}`;
    default:
      return 'Unknown packet type';
  }
};

export const validateIPAddress = (ip: string): boolean => {
  const ipRegex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  return ipRegex.test(ip);
};

export const validateMACAddress = (mac: string): boolean => {
  const macRegex = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/;
  return macRegex.test(mac);
};
