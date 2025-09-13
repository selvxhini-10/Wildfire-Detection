"use client";

// app/page.tsx (for App Router) or pages/index.tsx (for Pages Router)
import React, { useState, useEffect } from 'react';
import { AlertTriangle, Flame, Eye, EyeOff, RefreshCw, MapPin } from 'lucide-react';

const CanadianFireMap = () => {
  // Sample fire data - in your real app, this would come from your ML backend
  const [fireData, setFireData] = useState([
    { id: 1, lat: 60.7212, lng: -135.0568, confidence: 0.92, timestamp: '2024-09-13T14:30:00Z', intensity: 'high' },
    { id: 2, lat: 53.5461, lng: -113.4938, confidence: 0.87, timestamp: '2024-09-13T13:45:00Z', intensity: 'medium' },
    { id: 3, lat: 49.2827, lng: -123.1207, confidence: 0.74, timestamp: '2024-09-13T12:15:00Z', intensity: 'low' },
    { id: 4, lat: 45.5017, lng: -73.5673, confidence: 0.95, timestamp: '2024-09-13T11:20:00Z', intensity: 'high' },
    { id: 5, lat: 52.1332, lng: -106.6700, confidence: 0.68, timestamp: '2024-09-13T10:05:00Z', intensity: 'low' },
  ]);

  const [selectedFire, setSelectedFire] = useState(null);
  const [showLowConfidence, setShowLowConfidence] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdated(new Date());
      // In real implementation, fetch new data from your API
      // fetchLatestFireData();
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const getIntensityColor = (intensity, confidence) => {
    if (confidence < 0.7 && !showLowConfidence) return 'transparent';
    
    switch (intensity) {
      case 'high': return '#ef4444';
      case 'medium': return '#f97316';
      case 'low': return '#eab308';
      default: return '#6b7280';
    }
  };

  const getIntensitySize = (intensity, confidence) => {
    if (confidence < 0.7 && !showLowConfidence) return 0;
    
    switch (intensity) {
      case 'high': return 20;
      case 'medium': return 15;
      case 'low': return 10;
      default: return 8;
    }
  };

  const filteredFires = showLowConfidence 
    ? fireData 
    : fireData.filter(fire => fire.confidence >= 0.7);

  const refreshData = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLastUpdated(new Date());
    setIsLoading(false);
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <div className="w-full h-screen bg-gray-900 text-white flex flex-col">
      {/* Header */}
      <div className="bg-gray-800 p-4 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Flame className="h-8 w-8 text-orange-500" />
            <div>
              <h1 className="text-2xl font-bold">Canadian Forest Fire Monitor</h1>
              <p className="text-gray-400 text-sm">
                Real-time satellite fire detection • Last updated: {lastUpdated.toLocaleTimeString()}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowLowConfidence(!showLowConfidence)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                showLowConfidence ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-600 hover:bg-gray-700'
              }`}
            >
              {showLowConfidence ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
              <span className="text-sm">Low Confidence</span>
            </button>
            
            <button
              onClick={refreshData}
              disabled={isLoading}
              className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-1">
        {/* Map Area */}
        <div className="flex-1 relative bg-gray-800">
          {/* Simplified Canada Map SVG */}
          <svg 
            viewBox="0 0 1000 600" 
            className="w-full h-full"
            style={{ background: 'linear-gradient(180deg, #1e293b 0%, #0f172a 100%)' }}
          >
            {/* Simplified Canada outline */}
            <path
              d="M 50 300 Q 100 250 200 280 L 300 260 Q 400 240 500 250 L 600 245 Q 700 240 800 260 L 900 280 Q 950 320 900 380 L 800 400 Q 700 420 600 410 L 500 415 Q 400 420 300 410 L 200 405 Q 100 380 50 340 Z"
              fill="#374151"
              stroke="#4b5563"
              strokeWidth="2"
            />
            
            {/* Province boundaries - simplified */}
            <line x1="200" y1="260" x2="200" y2="420" stroke="#4b5563" strokeWidth="1" opacity="0.5" />
            <line x1="300" y1="250" x2="300" y2="430" stroke="#4b5563" strokeWidth="1" opacity="0.5" />
            <line x1="500" y1="240" x2="500" y2="440" stroke="#4b5563" strokeWidth="1" opacity="0.5" />
            <line x1="700" y1="240" x2="700" y2="420" stroke="#4b5563" strokeWidth="1" opacity="0.5" />

            {/* Fire markers */}
            {filteredFires.map(fire => {
              // Convert lat/lng to SVG coordinates (more accurate Canadian mapping)
              // Canada spans roughly: 141°W to 52°W longitude, 83°N to 42°N latitude
              const x = ((fire.lng + 141) / (52 + 141)) * 800 + 100; // Map longitude to x
              const y = ((83 - fire.lat) / (83 - 42)) * 400 + 150; // Map latitude to y (inverted)
              const size = getIntensitySize(fire.intensity, fire.confidence);
              const color = getIntensityColor(fire.intensity, fire.confidence);

              return (
                <g key={fire.id}>
                  {/* Pulsing animation for high intensity fires */}
                  {fire.intensity === 'high' && (
                    <circle
                      cx={x}
                      cy={y}
                      r={size + 5}
                      fill={color}
                      opacity="0.3"
                    >
                      <animate
                        attributeName="r"
                        values={`${size + 5};${size + 15};${size + 5}`}
                        dur="2s"
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="opacity"
                        values="0.3;0.1;0.3"
                        dur="2s"
                        repeatCount="indefinite"
                      />
                    </circle>
                  )}
                  
                  {/* Main fire marker */}
                  <circle
                    cx={x}
                    cy={y}
                    r={size}
                    fill={color}
                    stroke="white"
                    strokeWidth="2"
                    className="cursor-pointer hover:stroke-yellow-300"
                    onClick={() => setSelectedFire(fire)}
                  />
                  
                  {/* Confidence indicator */}
                  <text
                    x={x}
                    y={y + size + 15}
                    textAnchor="middle"
                    className="text-xs fill-white"
                    style={{ fontSize: '10px' }}
                  >
                    {Math.round(fire.confidence * 100)}%
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Legend */}
          <div className="absolute bottom-4 left-4 bg-gray-800 bg-opacity-90 p-4 rounded-lg">
            <h3 className="text-sm font-semibold mb-2">Fire Intensity</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded-full bg-red-500"></div>
                <span className="text-xs">High Intensity</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                <span className="text-xs">Medium Intensity</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                <span className="text-xs">Low Intensity</span>
              </div>
            </div>
          </div>
        </div>

        {/* Side Panel */}
        <div className="w-80 bg-gray-800 border-l border-gray-700 overflow-y-auto">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Active Fires</h2>
              <span className="bg-red-600 text-white px-2 py-1 rounded-full text-sm">
                {filteredFires.length}
              </span>
            </div>

            {/* Fire List */}
            <div className="space-y-3">
              {filteredFires.map(fire => (
                <div
                  key={fire.id}
                  className={`p-3 rounded-lg cursor-pointer transition-colors ${
                    selectedFire?.id === fire.id
                      ? 'bg-blue-600'
                      : 'bg-gray-700 hover:bg-gray-600'
                  }`}
                  onClick={() => setSelectedFire(fire)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: getIntensityColor(fire.intensity, fire.confidence) }}
                      ></div>
                      <span className="font-medium">Fire #{fire.id}</span>
                    </div>
                    <span className="text-xs text-gray-400 capitalize">
                      {fire.intensity}
                    </span>
                  </div>
                  
                  <div className="text-sm space-y-1">
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-3 w-3" />
                      <span>{fire.lat.toFixed(4)}, {fire.lng.toFixed(4)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Confidence:</span>
                      <span className={`font-medium ${
                        fire.confidence >= 0.8 ? 'text-green-400' : 
                        fire.confidence >= 0.7 ? 'text-yellow-400' : 'text-red-400'
                      }`}>
                        {Math.round(fire.confidence * 100)}%
                      </span>
                    </div>
                    <div className="text-xs text-gray-400">
                      {formatTimestamp(fire.timestamp)}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Selected Fire Details */}
            {selectedFire && (
              <div className="mt-6 p-4 bg-gray-700 rounded-lg">
                <h3 className="text-lg font-semibold mb-3">Fire Details</h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm text-gray-400">Location</label>
                    <p className="text-white">{selectedFire.lat.toFixed(6)}, {selectedFire.lng.toFixed(6)}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400">ML Confidence</label>
                    <p className="text-white">{Math.round(selectedFire.confidence * 100)}%</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400">Intensity Level</label>
                    <p className="text-white capitalize">{selectedFire.intensity}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400">Detection Time</label>
                    <p className="text-white">{formatTimestamp(selectedFire.timestamp)}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="bg-gray-800 border-t border-gray-700 p-2 flex items-center justify-between text-sm">
        <div className="flex items-center space-x-4">
          <span className="text-green-400">● Connected</span>
          <span>Total Fires: {filteredFires.length}</span>
          <span>High Priority: {filteredFires.filter(f => f.intensity === 'high').length}</span>
        </div>
        <div className="text-gray-400">
          Next satellite pass in 12 minutes
        </div>
      </div>
    </div>
  );
};

export default CanadianFireMap;