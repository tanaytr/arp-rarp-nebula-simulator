import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Device } from '../types';
import { scaleIn, fadeIn } from '../utils/animations';

interface DatabaseModalProps {
  devices: Device[];
  isOpen: boolean;
  onClose: () => void;
  onUpdateDevices: (devices: Device[]) => void;
}

const DatabaseModal: React.FC<DatabaseModalProps> = ({
  devices,
  isOpen,
  onClose,
  onUpdateDevices
}) => {
  const [editingDevices, setEditingDevices] = useState<Device[]>(devices);
  const [isEditing, setIsEditing] = useState(false);

  const handleDeviceChange = (id: string, field: keyof Device, value: string | boolean) => {
    setEditingDevices(prev => prev.map(device => 
      device.id === id ? { ...device, [field]: value } : device
    ));
  };

  const handleSave = () => {
    onUpdateDevices(editingDevices);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditingDevices(devices);
    setIsEditing(false);
  };

  const generateRandomIP = () => {
    return `192.168.${Math.floor(Math.random() * 255) + 1}.${Math.floor(Math.random() * 254) + 1}`;
  };

  const generateRandomMAC = () => {
    const hex = '0123456789ABCDEF';
    let mac = '';
    for (let i = 0; i < 6; i++) {
      if (i > 0) mac += ':';
      mac += hex[Math.floor(Math.random() * 16)] + hex[Math.floor(Math.random() * 16)];
    }
    return mac;
  };

  const addNewDevice = () => {
    const newDevice: Device = {
      id: `device-${Date.now()}`,
      name: `New Device ${editingDevices.length + 1}`,
      ip: generateRandomIP(),
      mac: generateRandomMAC(),
      x: 100 + (editingDevices.length % 3) * 200,
      y: 100 + Math.floor(editingDevices.length / 3) * 200,
      isActive: false,
      isOnline: true
    };
    setEditingDevices(prev => [...prev, newDevice]);
  };

  const removeDevice = (id: string) => {
    setEditingDevices(prev => prev.filter(device => device.id !== id));
  };

  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      variants={fadeIn}
      initial="initial"
      animate="animate"
      exit="exit"
      onClick={onClose}
    >
      <motion.div
        className="bg-gradient-to-br from-card-bg to-darker-bg border-2 border-cyber-blue rounded-xl
                   w-full max-w-4xl max-h-[90vh] overflow-hidden backdrop-blur-sm"
        variants={scaleIn}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-cyber-blue/30">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-cyber font-bold text-cyber-blue mb-2">
                Nebula Database Access
              </h2>
              <p className="text-gray-300 text-sm">
                Manage network device configurations and topology
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 text-gray-400 hover:text-white transition-colors duration-200"
              aria-label="Close database"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {/* Device Table */}
          <div className="space-y-4">
            {editingDevices.map((device, index) => (
              <motion.div
                key={device.id}
                className="bg-gray-800/50 border border-gray-600 rounded-lg p-4"
                variants={scaleIn}
                initial="initial"
                animate="animate"
                transition={{ delay: index * 0.1 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
                  {/* Device Icon & Name */}
                  <div className="md:col-span-2">
                    {isEditing ? (
                      <input
                        type="text"
                        value={device.name}
                        onChange={(e) => handleDeviceChange(device.id, 'name', e.target.value)}
                        className="w-full p-2 bg-gray-700 border border-gray-500 rounded text-white text-sm"
                      />
                    ) : (
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">💻</span>
                        <span className="font-cyber text-cyber-blue">{device.name}</span>
                      </div>
                    )}
                  </div>

                  {/* IP Address */}
                  <div>
                    <label className="text-xs text-gray-400 block mb-1">IP Address</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={device.ip}
                        onChange={(e) => handleDeviceChange(device.id, 'ip', e.target.value)}
                        className="w-full p-2 bg-gray-700 border border-gray-500 rounded text-white text-sm font-mono"
                      />
                    ) : (
                      <div className="font-mono text-cyber-green text-sm">{device.ip}</div>
                    )}
                  </div>

                  {/* MAC Address */}
                  <div>
                    <label className="text-xs text-gray-400 block mb-1">MAC Address</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={device.mac}
                        onChange={(e) => handleDeviceChange(device.id, 'mac', e.target.value)}
                        className="w-full p-2 bg-gray-700 border border-gray-500 rounded text-white text-sm font-mono"
                      />
                    ) : (
                      <div className="font-mono text-cyber-purple text-sm">{device.mac}</div>
                    )}
                  </div>

                  {/* Status */}
                  <div>
                    <label className="text-xs text-gray-400 block mb-1">Status</label>
                    {isEditing ? (
                      <select
                        value={device.isOnline ? 'online' : 'offline'}
                        onChange={(e) => handleDeviceChange(device.id, 'isOnline', e.target.value === 'online')}
                        className="w-full p-2 bg-gray-700 border border-gray-500 rounded text-white text-sm"
                      >
                        <option value="online">Online</option>
                        <option value="offline">Offline</option>
                      </select>
                    ) : (
                      <div className={`text-sm font-bold ${device.isOnline ? 'text-cyber-green' : 'text-red-400'}`}>
                        {device.isOnline ? 'ONLINE' : 'OFFLINE'}
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2">
                    {isEditing && (
                      <button
                        onClick={() => removeDevice(device.id)}
                        className="px-3 py-1 bg-red-600 text-white rounded text-xs hover:bg-red-700 transition-colors"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Add Device Button */}
          {isEditing && (
            <motion.button
              onClick={addNewDevice}
              className="w-full p-4 border-2 border-dashed border-cyber-blue/50 rounded-lg
                         text-cyber-blue hover:border-cyber-blue hover:bg-cyber-blue/10
                         transition-all duration-300 font-cyber font-bold"
              variants={scaleIn}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center justify-center space-x-2">
                <span className="text-xl">➕</span>
                <span>Add New Device</span>
              </div>
            </motion.button>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-cyber-blue/30 flex justify-between">
          <div className="text-sm text-gray-400">
            {editingDevices.length} devices in network
          </div>
          
          <div className="flex space-x-3">
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="px-6 py-2 bg-cyber-blue text-white rounded-lg font-cyber font-bold
                           hover:bg-cyber-blue/80 transition-colors duration-300"
              >
                Edit Database
              </button>
            ) : (
              <>
                <button
                  onClick={handleCancel}
                  className="px-6 py-2 bg-gray-600 text-white rounded-lg font-cyber font-bold
                             hover:bg-gray-700 transition-colors duration-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-6 py-2 bg-cyber-green text-white rounded-lg font-cyber font-bold
                             hover:bg-cyber-green/80 transition-colors duration-300"
                >
                  Save Changes
                </button>
              </>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DatabaseModal;
