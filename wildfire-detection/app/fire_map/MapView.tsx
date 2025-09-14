"use client";
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Link from "next/link";

// Helper functions and types

type Fire = {
    id: number;
    lat: number;
    lng: number;
    confidence: number;
    timestamp: string;
};

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

const getFireIcon = (confidence: number) => {
    if (typeof window === 'undefined') return undefined;
    const L = require('leaflet');
    const color = getConfidenceColor(confidence);
    const size = getConfidenceSize(confidence);
    return L.divIcon({
        className: '',
        html: `<div style="width:${size}px;height:${size}px;border-radius:50%;background:${color};border:2px solid white;"></div>`
    });
};

export default function MapView({
    fireData,
    selectedFire,
    setSelectedFire,
    filteredFires,
    formatTimestamp
}: {
    fireData: Fire[];
    selectedFire: Fire | null;
    setSelectedFire: (fire: Fire) => void;
    filteredFires: Fire[];
    formatTimestamp: (timestamp: string) => string;
}) {
    return (
        <MapContainer center={[56.1304, -106.3468]} zoom={4} style={{ height: '100%', width: '100%' }}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {filteredFires.map(fire => (
                <Marker
                    key={fire.id}
                    position={[fire.lat, fire.lng]}
                    icon={getFireIcon(fire.confidence)}
                    eventHandlers={{
                        click: () => setSelectedFire(fire)
                    }}
                >
                    <Popup>
                        <div>
                            <strong>Fire #{fire.id}</strong><br />
                            <span>Confidence: {Math.round(fire.confidence * 100)}%</span><br />
                            <span>Location: {fire.lat.toFixed(4)}, {fire.lng.toFixed(4)}</span><br />
                            <span>Detected: {formatTimestamp(fire.timestamp)}</span>
                        </div>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
}
