"use client";

import { MapContainer, TileLayer, Marker, Popup, Polygon, ZoomControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix missing marker icons in leaflet with Next.js/Webpack
const iconRetinaUrl = "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png";
const iconUrl = "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png";
const shadowUrl = "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png";

const DefaultIcon = L.icon({
  iconUrl,
  iconRetinaUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

// Custom Icons for specific markers
const secretariatIcon = L.divIcon({
  className: "custom-div-icon",
  html: `<div style="background-color: #1B2B4C; color: white; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; border: 2px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3);">RW</div>`,
  iconSize: [30, 30],
  iconAnchor: [15, 15],
});

const poskamlingIcon = L.divIcon({
  className: "custom-div-icon",
  html: `<div style="background-color: #ef4444; color: white; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 10px; border: 2px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3);">P</div>`,
  iconSize: [24, 24],
  iconAnchor: [12, 12],
});

// Coordinates: approx for Kutabumi, Tangerang (Tangerang is around -6.17, 106.63)
const CENTER: [number, number] = [-6.175, 106.58];

const MARKERS = [
  { id: 1, pos: [-6.175, 106.58] as [number, number], title: "Sekretariat RW 12", type: "rw", desc: "Pusat pelayanan administrasi RW 12" },
  { id: 2, pos: [-6.173, 106.578] as [number, number], title: "Poskamling RT 01", type: "pos", desc: "Pos Keamanan Lingkungan RT 01" },
  { id: 3, pos: [-6.176, 106.582] as [number, number], title: "Poskamling RT 04", type: "pos", desc: "Pos Keamanan Lingkungan RT 04" },
  { id: 4, pos: [-6.178, 106.579] as [number, number], title: "Poskamling RT 07", type: "pos", desc: "Pos Keamanan Lingkungan RT 07" },
  { id: 5, pos: [-6.174, 106.583] as [number, number], title: "Fasum Taman Warga", type: "fasum", desc: "Area bermain anak dan olahraga" },
];

// Dummy polygon for RW boundaries
const RW_BOUNDARY: [number, number][] = [
  [-6.171, 106.576],
  [-6.171, 106.585],
  [-6.179, 106.585],
  [-6.179, 106.576],
];

export default function MapComponent() {
  return (
    <div className="w-full h-full rounded-xs overflow-hidden border border-slate-100 shadow-inner z-0 relative">
      <MapContainer 
        center={CENTER} 
        zoom={15} 
        scrollWheelZoom={false} 
        className="w-full h-full"
        zoomControl={false}
      >
        <ZoomControl position="bottomright" />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* Draw RW Boundaries */}
        <Polygon 
          positions={RW_BOUNDARY} 
          pathOptions={{ color: '#1B2B4C', fillColor: '#1B2B4C', fillOpacity: 0.1, weight: 2, dashArray: "5, 5" }} 
        />

        {/* Render Markers */}
        {MARKERS.map((marker) => (
          <Marker 
            key={marker.id} 
            position={marker.pos} 
            icon={marker.type === "rw" ? secretariatIcon : marker.type === "pos" ? poskamlingIcon : DefaultIcon}
          >
            <Popup className="font-sans">
              <div className="text-center p-1">
                <h4 className="font-bold text-sm text-brand-primary m-0 mb-1">{marker.title}</h4>
                <p className="text-xs text-gray-600 m-0 leading-tight">{marker.desc}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
