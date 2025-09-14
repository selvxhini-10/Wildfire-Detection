"use client";

import React, { useState, useEffect } from 'react';
import { Flame, Eye, EyeOff, RefreshCw, MapPin } from 'lucide-react';

import dynamic from 'next/dynamic';
const MapView = dynamic(() => import('./MapView'), { ssr: false });

import Link from "next/link";


const CanadianFireMap = () => {
    type Fire = {
        id: number;
        lat: number;
        lng: number;
        confidence: number;
        timestamp: string;
    };
    const [fireData, setFireData] = useState<Fire[]>([
        { id: 1, lat: 60.7212, lng: -135.0568, confidence: 0.92, timestamp: '2024-09-13T14:30:00Z' },
        { id: 2, lat: 53.5461, lng: -113.4938, confidence: 0.87, timestamp: '2024-09-13T13:45:00Z' },
        { id: 3, lat: 49.2827, lng: -123.1207, confidence: 0.74, timestamp: '2024-09-13T12:15:00Z' },
        { id: 4, lat: 45.5017, lng: -73.5673, confidence: 0.95, timestamp: '2024-09-13T11:20:00Z' },
        { id: 5, lat: 52.1332, lng: -106.6700, confidence: 0.68, timestamp: '2024-09-13T10:05:00Z' },
    ]);

    const [selectedFire, setSelectedFire] = useState<Fire | null>(null);
    const [showLowConfidence, setShowLowConfidence] = useState(true);
    const [lastUpdated, setLastUpdated] = useState(new Date());
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setLastUpdated(new Date());
        }, 30000);
        return () => clearInterval(interval);
    }, []);

    // Helper for marker color and size based on confidence
    const getConfidenceColor = (confidence: number) => {
        if (confidence >= 0.9) return 'red';
        if (confidence >= 0.8) return 'orange';
        if (confidence >= 0.7) return 'yellow';
        return 'green';
    };

    const getConfidenceSize = (confidence: number) => {
        if (confidence >= 0.9) return 22;
        if (confidence >= 0.8) return 18;
        if (confidence >= 0.7) return 14;
        return 10;
    };

    // Custom Leaflet icon for fire markers
    const getFireIcon = (confidence: number) => {
        if (typeof window === 'undefined') return undefined;
        // Import Leaflet only on client
        const L = require('leaflet');
        const color = getConfidenceColor(confidence);
        const size = getConfidenceSize(confidence);
        return L.divIcon({
            className: '',
            html: `<div style="width:${size}px;height:${size}px;border-radius:50%;background:${color};border:2px solid white;"></div>`
        });
    };

    const filteredFires = showLowConfidence
        ? fireData
        : fireData.filter(fire => fire.confidence >= 0.7);

    const refreshData = async () => {
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        setLastUpdated(new Date());
        setIsLoading(false);
    };

    const formatTimestamp = (timestamp: string) => {
        return new Date(timestamp).toLocaleString();
    };

    return (
        
        <div className="w-full h-screen bg-gray-900 text-white flex flex-col">
            {/* Header */}
             {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-orange-500/20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-extrabold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
            HELIO
          </div>
          <div className="hidden md:flex space-x-8">
            {["Home", "Fire Map", "AI Classifier"].map((name, idx) => (
              <Link key={idx} href={name === "Home" ? "/" : `/${name.toLowerCase().replace(" ", "_")}`}>
                <span className="relative text-sm font-medium uppercase tracking-wider cursor-pointer transition-all duration-300 hover:text-orange-400 hover:drop-shadow-[0_0_10px_rgba(255,165,0,0.8)]">
                  {name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </nav>

            {/* Title Section */}
            <section className="pt-24 pb-6 bg-gray-900 text-center">
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-2xl md:text-5xl font-bold bg-gradient-to-r from-orange-400 via-red-500 to-orange-600 bg-clip-text text-transparent mb-2 flex items-center justify-center gap-2">
                        Canadian Forest Fire Monitor
                    </h1>
                    <p className="text-gray-400 text-lg">
                        Real-time satellite fire detection &bull; Last updated: {lastUpdated.toLocaleTimeString()}
                    </p>
                    <div className="flex items-center justify-center gap-4 mt-4">
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
            </section>

            <div className="flex flex-1">
                {/* Map Area */}
                <div className="flex-1 relative bg-gray-800">
                        <MapView
                            fireData={fireData}
                            selectedFire={selectedFire}
                            setSelectedFire={setSelectedFire}
                            filteredFires={filteredFires}
                            formatTimestamp={formatTimestamp}
                        />
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
                                                className="rounded-full"
                                                style={{
                                                    backgroundColor: getConfidenceColor(fire.confidence),
                                                    width: `${getConfidenceSize(fire.confidence) / 2}px`,
                                                    height: `${getConfidenceSize(fire.confidence) / 2}px`
                                                }}
                                            ></div>
                                            <span className="font-medium">Fire #{fire.id}</span>
                                        </div>
                                    </div>
                                    <div className="text-sm space-y-1">
                                        <div className="flex items-center space-x-1">
                                            <MapPin className="h-3 w-3" />
                                            <span>{fire.lat.toFixed(4)}, {fire.lng.toFixed(4)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Confidence:</span>
                                            <span className={`font-medium ${
                                                fire.confidence >= 0.9 ? 'text-red-400' :
                                                fire.confidence >= 0.8 ? 'text-orange-400' :
                                                fire.confidence >= 0.7 ? 'text-yellow-400' : 'text-green-400'
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
                </div>
                <div className="text-gray-400">
                    Next satellite pass in 12 minutes
                </div>
            </div>
        </div>
    );
};

export default CanadianFireMap;
