import React from 'react';
import { Device } from '../types';

interface DeviceInfoProps {
  device: Device;
  className?: string;
}

export const DeviceInfo: React.FC<DeviceInfoProps> = ({ device, className = '' }) => {
  return (
    <div className={`bg-darker-bg/80 rounded-lg p-4 backdrop-blur-sm border border-cyber-blue/30 ${className}`}>
      <h3 className="text-cyber-blue font-cyber text-lg mb-4">Device Information</h3>
      <div className="space-y-2 font-mono text-sm">
        <div className="flex justify-between">
          <span className="text-gray-400">Name:</span>
          <span className="text-white">{device.name}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">IP Address:</span>
          <span className="text-white">{device.ip}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">MAC Address:</span>
          <span className="text-white">{device.mac}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Type:</span>
          <span className="text-white">{device.type}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Status:</span>
          <span className={`${device.isActive ? 'text-cyber-green' : 'text-cyber-red'}`}>
            {device.isActive ? 'Active' : 'Inactive'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default DeviceInfo;