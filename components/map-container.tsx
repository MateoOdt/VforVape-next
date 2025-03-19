'use client';

import dynamic from "next/dynamic";
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import MarkerPinRed from '@/assets/MarkerPinRed.png';

// Dynamically import Leaflet components since they are not server-side compatible
const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then((mod) => mod.Marker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), { ssr: false });


export default function ContactMap() {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [customIcon, setCustomIcon] = useState<any>(null);

  useEffect(() => {
    setPosition([49.0355633, 2.8000864]);
  }, []);

  useEffect(() => {
    setPosition([49.0355633, 2.8000864]); 

    import("leaflet").then((L) => {
      setCustomIcon(
        new L.Icon({
          iconUrl: MarkerPinRed.src,
          iconSize: [26, 32],
          iconAnchor: [16, 32],
          popupAnchor: [0, -32],
        })
      );
    });
  }, []);

  if (!position) return null;

  return (
    <MapContainer center={position} zoom={13} style={{ height: '200px', width: '100%', borderRadius: '4px', marginTop: '15px' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={position} icon={customIcon}>
        <Popup>2 rue du 5 Septembre 1914, Saint-Soupplets 77165</Popup>
      </Marker>
    </MapContainer>
  );
}