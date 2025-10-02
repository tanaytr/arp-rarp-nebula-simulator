import React from 'react';
import { motion } from 'framer-motion';
import { fadeInUp } from '../utils/animations';

interface ARPCacheEntry {
  ip: string;
  mac: string;
  timestamp: Date;
  deviceName?: string;
}

interface ARPCacheTableProps {
  cache: ARPCacheEntry[];
  className?: string;
}

const ARPCacheTable: React.FC<ARPCacheTableProps> = ({
  cache,
  className = ''
}) => {
  return (
    <motion.div
      className={`bg-gradient-to-br from-card-bg to-darker-bg border border-cyber-blue rounded-xl p-4 backdrop-blur-sm ${className}`}
      variants={fadeInUp}
      initial="initial"
      animate="animate"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-cyber font-bold text-cyber-blue">
          ARP Cache Table
        </h3>
        <div className="text-xs text-gray-400 font-mono">
          {cache.length} entries
        </div>
      </div>

      {/* Cache Table */}
      <div className="overflow-x-auto">
        {cache.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            <div className="text-4xl mb-2">🗂️</div>
            <div className="text-sm">Cache is empty</div>
            <div className="text-xs text-gray-400 mt-1">
              Run ARP simulation to populate cache
            </div>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-600">
                <th className="text-left py-2 text-cyber-blue font-cyber">IP Address</th>
                <th className="text-left py-2 text-cyber-green font-cyber">MAC Address</th>
                <th className="text-left py-2 text-cyber-purple font-cyber">Device</th>
                <th className="text-left py-2 text-gray-400 font-cyber">Time</th>
              </tr>
            </thead>
            <tbody>
              {cache.map((entry, index) => (
                <motion.tr
                  key={`${entry.ip}-${entry.mac}`}
                  className="border-b border-gray-700/50 hover:bg-gray-800/30 transition-colors"
                  variants={fadeInUp}
                  initial="initial"
                  animate="animate"
                  transition={{ delay: index * 0.1 }}
                >
                  <td className="py-2 font-mono text-cyber-blue">{entry.ip}</td>
                  <td className="py-2 font-mono text-cyber-green">{entry.mac}</td>
                  <td className="py-2 text-cyber-purple">{entry.deviceName || 'Unknown'}</td>
                  <td className="py-2 text-gray-400 text-xs">
                    {entry.timestamp.toLocaleTimeString()}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Footer */}
      <div className="mt-4 pt-3 border-t border-gray-600">
        <div className="text-xs text-gray-400 text-center">
          IP-to-MAC address mappings • Updated in real-time
        </div>
      </div>
    </motion.div>
  );
};

export default ARPCacheTable;
