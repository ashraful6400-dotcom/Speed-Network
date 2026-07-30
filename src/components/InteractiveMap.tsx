'use client';

import React, { useState } from 'react';
import { Search, MapPin, CheckCircle, AlertTriangle, Radio, Wifi } from 'lucide-react';

interface Zone {
  id: string;
  name: string;
  uptime: string;
  ping: string;
  status: 'active' | 'maintenance' | 'expanding';
  lat: number;
  lng: number;
  connections: string[];
}

const zones: Zone[] = [
  { id: 'natore-sadar', name: 'Natore Sadar', uptime: '99.98%', ping: '1-2ms', status: 'active', lat: 150, lng: 140, connections: ['halsa', 'gurudaspur', 'natore-new'] },
  { id: 'halsa', name: 'Halsa Bazar (HQ)', uptime: '99.99%', ping: '1ms', status: 'active', lat: 200, lng: 200, connections: ['natore-sadar', 'gurudaspur', 'natore-new'] },
  { id: 'natore-new', name: 'Natore New Market', uptime: '99.92%', ping: '2ms', status: 'active', lat: 100, lng: 200, connections: ['natore-sadar', 'halsa'] },
  { id: 'gurudaspur', name: 'Gurudaspur Sadar', uptime: '99.85%', ping: '3-4ms', status: 'active', lat: 220, lng: 310, connections: ['halsa', 'natore-sadar', 'chalan-bil'] },
  { id: 'chalan-bil', name: 'Chalan Bil Zone', uptime: '99.50%', ping: '4-5ms', status: 'active', lat: 290, lng: 340, connections: ['gurudaspur'] },
  { id: 'birol', name: 'Birol Bazar', uptime: '98.80%', ping: '5-6ms', status: 'expanding', lat: 70, lng: 310, connections: ['natore-new'] },
];

export default function InteractiveMap() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedZone, setSelectedZone] = useState<Zone>(zones[0]);

  // Filter zones by search query
  const filteredZones = zones.filter((zone) =>
    zone.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchSelect = (zone: Zone) => {
    setSelectedZone(zone);
    setSearchQuery('');
  };

  return (
    <div className="glass-panel rounded-3xl border border-brand-cyan/20 dark:border-brand-cyan/10 p-6 md:p-8 shadow-xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side: Controls & Search */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          <div>
            <h3 className="text-2xl font-black text-brand-text-light dark:text-brand-text-dark mb-2">
              Coverage Finder
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
              Search your area or click directly on the interactive network map node to view real-time latency and connectivity status.
            </p>

            {/* Search Box */}
            <div className="relative mb-6">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400">
                <Search className="w-5 h-5" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search area (e.g. Gulshan, Mirpur...)"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-brand-cyan/20 bg-white/50 dark:bg-brand-dark/30 text-brand-text-light dark:text-white placeholder-gray-400 focus:outline-none focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan"
              />
              
              {/* Autocomplete Dropdown */}
              {searchQuery && (
                <div className="absolute z-20 w-full mt-2 rounded-xl glass-panel border border-brand-cyan/30 shadow-2xl overflow-hidden max-h-48 overflow-y-auto">
                  {filteredZones.length > 0 ? (
                    filteredZones.map((zone) => (
                      <button
                        key={zone.id}
                        onClick={() => handleSearchSelect(zone)}
                        className="w-full text-left px-4 py-3 hover:bg-brand-cyan/10 text-sm text-brand-text-light dark:text-gray-200 flex items-center space-x-2 transition-colors border-b border-brand-cyan/5 last:border-b-0"
                      >
                        <MapPin className="w-4 h-4 text-brand-cyan" />
                        <span>{zone.name}</span>
                      </button>
                    ))
                  ) : (
                    <div className="px-4 py-3 text-sm text-gray-500">No coverage zones found</div>
                  )}
                </div>
              )}
            </div>

            {/* Coverage Status Card */}
            <div className="glass-panel p-6 rounded-2xl border border-brand-cyan/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-brand-cyan/5 rounded-full blur-2xl" />
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs uppercase font-bold text-gray-400 tracking-wider">Selected Hub</span>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center space-x-1 ${
                    selectedZone.status === 'active'
                      ? 'bg-green-500/10 text-green-500 border border-green-500/20'
                      : selectedZone.status === 'maintenance'
                      ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20'
                      : 'bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/20'
                  }`}
                >
                  {selectedZone.status === 'active' && <CheckCircle className="w-3.5 h-3.5 mr-1" />}
                  {selectedZone.status === 'maintenance' && <AlertTriangle className="w-3.5 h-3.5 mr-1" />}
                  {selectedZone.status === 'expanding' && <Radio className="w-3.5 h-3.5 mr-1" />}
                  {selectedZone.status}
                </span>
              </div>
              <h4 className="text-xl font-bold text-brand-text-light dark:text-white mb-4 flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-brand-cyan" />
                <span>{selectedZone.name}</span>
              </h4>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/40 dark:bg-brand-dark/20 p-3 rounded-xl border border-brand-cyan/5">
                  <span className="text-xs text-gray-400 font-bold block uppercase">Network Uptime</span>
                  <span className="text-lg font-extrabold text-brand-text-light dark:text-white">{selectedZone.uptime}</span>
                </div>
                <div className="bg-white/40 dark:bg-brand-dark/20 p-3 rounded-xl border border-brand-cyan/5">
                  <span className="text-xs text-gray-400 font-bold block uppercase">Gateway Ping</span>
                  <span className="text-lg font-extrabold text-brand-cyan">{selectedZone.ping}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="hidden lg:block text-xs text-gray-400 pt-4">
            <div className="flex items-center space-x-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-green-500 inline-block" />
              <span>Green: Active High-speed Fiber Ring</span>
            </div>
            <div className="flex items-center space-x-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
              <span>Yellow: Scheduled Maintenance (Routing Optimization)</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-brand-cyan inline-block animate-pulse" />
              <span>Cyan: Deployment phase / Network expansion</span>
            </div>
          </div>
        </div>

        {/* Right Side: Interactive Map Visualization */}
        <div className="lg:col-span-7 flex items-center justify-center bg-gray-50/50 dark:bg-brand-deep/30 rounded-2xl border border-brand-cyan/10 p-4 relative overflow-hidden min-h-[350px]">
          {/* Grid background */}
          <div className="absolute inset-0 dot-grid opacity-60 pointer-events-none" />

          {/* Symmetrical Network Mesh SVG */}
          <svg className="w-full max-w-[450px] aspect-[4/3] relative z-10" viewBox="0 0 400 380">
            {/* Draw Connection Links first so they appear behind nodes */}
            {zones.map((zone) =>
              zone.connections.map((connId) => {
                const target = zones.find((z) => z.id === connId);
                if (!target) return null;
                const isSelectedLink = selectedZone.id === zone.id || selectedZone.id === target.id;
                return (
                  <line
                    key={`${zone.id}-${connId}`}
                    x1={zone.lng}
                    y1={zone.lat}
                    x2={target.lng}
                    y2={target.lat}
                    className={`transition-all duration-300 ${
                      isSelectedLink
                        ? 'stroke-brand-cyan stroke-[2.5] opacity-80'
                        : 'stroke-brand-blue/30 dark:stroke-brand-cyan/10 stroke-[1.5]'
                    }`}
                    strokeDasharray={zone.status === 'expanding' || target.status === 'expanding' ? '4 4' : '0'}
                  />
                );
              })
            )}

            {/* Draw Pulsing Background Waves for Selected Node */}
            <circle
              cx={selectedZone.lng}
              cy={selectedZone.lat}
              r="22"
              className="fill-none stroke-brand-cyan/40 stroke-2 animate-ping"
              style={{ transformOrigin: `${selectedZone.lng}px ${selectedZone.lat}px` }}
            />

            {/* Draw Nodes */}
            {zones.map((zone) => {
              const isSelected = selectedZone.id === zone.id;
              let color = 'fill-green-500 stroke-green-300';
              if (zone.status === 'maintenance') {
                color = 'fill-amber-500 stroke-amber-300';
              } else if (zone.status === 'expanding') {
                color = 'fill-brand-cyan stroke-brand-blue';
              }

              return (
                <g
                  key={zone.id}
                  onClick={() => setSelectedZone(zone)}
                  className="cursor-pointer group select-none"
                >
                  {/* Outer Hover Ring */}
                  <circle
                    cx={zone.lng}
                    cy={zone.lat}
                    r={isSelected ? '12' : '8'}
                    className={`transition-all duration-300 ${
                      isSelected
                        ? 'fill-brand-cyan/20 stroke-brand-cyan stroke-2'
                        : 'fill-transparent stroke-transparent group-hover:fill-brand-cyan/10 group-hover:stroke-brand-cyan/30'
                    }`}
                  />
                  {/* Core Node Dot */}
                  <circle
                    cx={zone.lng}
                    cy={zone.lat}
                    r={isSelected ? '6' : '4.5'}
                    className={`transition-all duration-300 ${color}`}
                  />
                  {/* Text Label */}
                  <text
                    x={zone.lng}
                    y={zone.lat - 14}
                    textAnchor="middle"
                    className={`text-[9px] font-bold transition-all select-none pointer-events-none fill-brand-text-light dark:fill-white ${
                      isSelected ? 'opacity-100 scale-105 fill-brand-cyan dark:fill-brand-cyan' : 'opacity-60 group-hover:opacity-100'
                    }`}
                  >
                    {zone.name.split(' ')[0]}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>
    </div>
  );
}
