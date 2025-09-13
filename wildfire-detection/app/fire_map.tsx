"use client";

// app/page.tsx (for App Router) or pages/index.tsx (for Pages Router)
import React, { useState, useEffect } from 'react';
import { AlertTriangle, Flame, Eye, EyeOff, RefreshCw, MapPin } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

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

  // Helper for marker color
  const getIntensityColor = (intensity, confidence) => {
    if (confidence < 0.7 && !showLowConfidence) return 'transparent';
    switch (intensity) {
      case 'high': return 'red';
      case 'medium': return 'orange';
      case 'low': return 'yellow';
      default: return 'gray';
    }
  };

  // Custom Leaflet icon for fire markers
  const getFireIcon = (intensity, confidence) => {
    const color = getIntensityColor(intensity, confidence);
    return L.divIcon({
      className: '',
      html: `<div style="width:18px;height:18px;border-radius:50%;background:${color};border:2px solid white;"></div>`
    });
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
          <MapContainer center={[56.1304, -106.3468]} zoom={4} style={{ height: '100%', width: '100%' }}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {filteredFires.map(fire => (
              <Marker
                key={fire.id}
                position={[fire.lat, fire.lng]}
                icon={getFireIcon(fire.intensity, fire.confidence)}
                eventHandlers={{
                  click: () => setSelectedFire(fire)
                }}
              >
                <Popup>
                  <div>
                    <strong>Fire #{fire.id}</strong><br />
                    <span>Intensity: {fire.intensity}</span><br />
                    <span>Confidence: {Math.round(fire.confidence * 100)}%</span><br />
                    <span>Location: {fire.lat.toFixed(4)}, {fire.lng.toFixed(4)}</span><br />
                    <span>Detected: {formatTimestamp(fire.timestamp)}</span>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
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