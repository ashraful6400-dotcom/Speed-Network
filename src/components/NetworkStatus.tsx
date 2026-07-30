'use client';

import React, { useState, useEffect } from 'react';
import { Wifi, AlertCircle, RefreshCw, Server, ArrowUpRight, CheckCircle2 } from 'lucide-react';

interface NodeStatus {
  id: string;
  name: string;
  location: string;
  ping: number;
  uptime: string;
  status: 'online' | 'maintenance' | 'offline';
}

export default function NetworkStatus() {
  const [nodes, setNodes] = useState<NodeStatus[]>([
    { id: 'dhaka-n', name: 'Dhaka North Core', location: 'Uttara Hub', ping: 2, uptime: '99.98%', status: 'online' },
    { id: 'dhaka-s', name: 'Dhaka South Core', location: 'Motijheel Hub', ping: 3, uptime: '99.99%', status: 'online' },
    { id: 'bdix', name: 'BDIX Peering Gateway', location: 'Dhaka IX', ping: 1, uptime: '100.00%', status: 'online' },
    { id: 'ctg-g', name: 'Chittagong Ring Node', location: 'Agrabad Hub', ping: 8, uptime: '99.45%', status: 'online' },
    { id: 'intl', name: 'International Uplink (SMW5)', location: 'Cox\'s Bazar Landing', ping: 28, uptime: '99.85%', status: 'online' },
    { id: 'cache', name: 'Google & Netflix CDNs', location: 'SpeedNetwork DataCenter', ping: 1, uptime: '99.99%', status: 'online' },
  ]);

  const [lastUpdated, setLastUpdated] = useState<string>('');

  useEffect(() => {
    // Update pings randomly every 3 seconds to simulate live monitoring
    const interval = setInterval(() => {
      setNodes((prevNodes) =>
        prevNodes.map((node) => {
          if (node.status === 'online') {
            const delta = Math.floor(Math.random() * 3) - 1; // -1, 0, +1
            let newPing = node.ping + delta;
            if (newPing < 1) newPing = 1;
            return { ...node, ping: newPing };
          }
          return node;
        })
      );
      
      const now = new Date();
      setLastUpdated(now.toLocaleTimeString());
    }, 3000);

    const now = new Date();
    setLastUpdated(now.toLocaleTimeString());

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      {/* Maintenance alert banner */}
      <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 flex items-start space-x-3 text-amber-500">
        <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
        <div>
          <h5 className="font-bold text-sm">Scheduled Maintenance Notice</h5>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">
            Please be advised that scheduled routing optimization will occur on the Chittagong Ring Node between 2:00 AM and 4:00 AM BST. Broadband connections in Chittagong Central may experience intermittent packet loss for up to 10 minutes.
          </p>
        </div>
      </div>

      {/* Nodes Status Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {nodes.map((node) => (
          <div
            key={node.id}
            className="glass-panel p-5 rounded-2xl border border-brand-cyan/10 flex flex-col justify-between"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-brand-cyan/10 border border-brand-cyan/20 flex items-center justify-center text-brand-cyan">
                  <Server className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="font-bold text-sm text-brand-text-light dark:text-white leading-tight">
                    {node.name}
                  </h5>
                  <p className="text-[10px] text-gray-400 font-medium">
                    {node.location}
                  </p>
                </div>
              </div>

              {/* Status light */}
              <div className="flex items-center space-x-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="text-[10px] font-extrabold uppercase text-green-500 tracking-wider">
                  Active
                </span>
              </div>
            </div>

            {/* Performance Stats */}
            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-brand-cyan/5">
              <div className="bg-white/40 dark:bg-brand-dark/20 p-2.5 rounded-xl border border-brand-cyan/5 text-center">
                <span className="text-[10px] text-gray-400 font-bold block uppercase tracking-wider">Ping Latency</span>
                <span className="text-base font-extrabold text-brand-cyan">{node.ping} ms</span>
              </div>
              <div className="bg-white/40 dark:bg-brand-dark/20 p-2.5 rounded-xl border border-brand-cyan/5 text-center">
                <span className="text-[10px] text-gray-400 font-bold block uppercase tracking-wider">Node Uptime</span>
                <span className="text-base font-extrabold text-brand-text-light dark:text-white">{node.uptime}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer / Last sync */}
      <div className="flex justify-between items-center text-[10px] text-gray-400 pt-2 px-2">
        <div className="flex items-center space-x-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
          <span>All nodes operational</span>
        </div>
        <div className="flex items-center space-x-1">
          <RefreshCw className="w-3 h-3 animate-spin text-brand-cyan" />
          <span>Live monitoring updated at: {lastUpdated}</span>
        </div>
      </div>
    </div>
  );
}
