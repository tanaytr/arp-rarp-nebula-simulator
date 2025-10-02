import React from 'react';
import { motion } from 'framer-motion';
import { fadeInUp } from '../utils/animations';

interface ActivityEntry {
  id: string;
  timestamp: Date;
  type: 'ARP_REQUEST' | 'ARP_REPLY' | 'RARP_REQUEST' | 'RARP_REPLY' | 'CACHE_UPDATE' | 'DEVICE_UPDATE';
  message: string;
  sourceIP?: string;
  sourceMAC?: string;
  targetIP?: string;
  targetMAC?: string;
}

interface ActivityLogProps {
  activities: ActivityEntry[];
  className?: string;
}

const ActivityLog: React.FC<ActivityLogProps> = ({
  activities,
  className = ''
}) => {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'ARP_REQUEST': return '📡';
      case 'ARP_REPLY': return '✅';
      case 'RARP_REQUEST': return '🔍';
      case 'RARP_REPLY': return '🎯';
      case 'CACHE_UPDATE': return '💾';
      case 'DEVICE_UPDATE': return '🔄';
      default: return '📦';
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'ARP_REQUEST': return 'text-cyber-blue';
      case 'ARP_REPLY': return 'text-cyber-green';
      case 'RARP_REQUEST': return 'text-cyber-orange';
      case 'RARP_REPLY': return 'text-neon-pink';
      case 'CACHE_UPDATE': return 'text-cyber-purple';
      case 'DEVICE_UPDATE': return 'text-cyber-blue';
      default: return 'text-gray-400';
    }
  };

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
          Protocol Activity Log
        </h3>
        <div className="text-xs text-gray-400 font-mono">
          {activities.length} entries
        </div>
      </div>

      {/* Activity List */}
      <div className="space-y-3 max-h-64 overflow-y-auto">
        {activities.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            <div className="text-4xl mb-2">📋</div>
            <div className="text-sm">No activities yet</div>
            <div className="text-xs text-gray-400 mt-1">
              Start a simulation to see protocol activities
            </div>
          </div>
        ) : (
          activities.slice(-10).reverse().map((activity, index) => (
            <motion.div
              key={activity.id}
              className="bg-gray-800/50 border border-gray-600 rounded-lg p-3"
              variants={fadeInUp}
              initial="initial"
              animate="animate"
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-start space-x-3">
                <div className="text-lg">{getActivityIcon(activity.type)}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-sm font-bold ${getActivityColor(activity.type)}`}>
                      {activity.type.replace('_', ' ')}
                    </span>
                    <span className="text-xs text-gray-400 font-mono">
                      {activity.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                  <div className="text-sm text-gray-300 mb-2">
                    {activity.message}
                  </div>
                  {(activity.sourceIP || activity.targetIP) && (
                    <div className="text-xs text-gray-400 space-y-1">
                      {activity.sourceIP && (
                        <div>From: {activity.sourceIP} ({activity.sourceMAC})</div>
                      )}
                      {activity.targetIP && (
                        <div>To: {activity.targetIP} ({activity.targetMAC})</div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Footer */}
      <div className="mt-4 pt-3 border-t border-gray-600">
        <div className="text-xs text-gray-400 text-center">
          Real-time protocol monitoring • ARP & RARP activities
        </div>
      </div>
    </motion.div>
  );
};

export default ActivityLog;
