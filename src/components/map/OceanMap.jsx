import React from "react";
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from "react-leaflet";
import { Link } from "react-router-dom";
import "leaflet/dist/leaflet.css";

const oceanRegions = [
  { id: "north-atlantic", name: "North Atlantic", lat: 45, lng: -30, temp: 14.2, health: 72, color: "#006EE6", risk: "Moderate" },
  { id: "south-atlantic", name: "South Atlantic", lat: -25, lng: -15, temp: 21.5, health: 68, color: "#FFB300", risk: "Elevated" },
  { id: "north-pacific", name: "North Pacific", lat: 40, lng: -160, temp: 12.8, health: 78, color: "#00D2D3", risk: "Low" },
  { id: "south-pacific", name: "South Pacific", lat: -30, lng: -140, temp: 23.1, health: 65, color: "#FFB300", risk: "Elevated" },
  { id: "indian-ocean", name: "Indian Ocean", lat: -10, lng: 75, temp: 27.3, health: 58, color: "#FF5252", risk: "High" },
  { id: "arctic", name: "Arctic Ocean", lat: 75, lng: 0, temp: 1.2, health: 82, color: "#00C853", risk: "Low" },
  { id: "southern", name: "Southern Ocean", lat: -65, lng: 0, temp: 0.5, health: 85, color: "#00C853", risk: "Low" },
  { id: "great-barrier", name: "Great Barrier Reef", lat: -18, lng: 147, temp: 26.8, health: 45, color: "#FF5252", risk: "Critical" },
  { id: "caribbean", name: "Caribbean Sea", lat: 18, lng: -75, temp: 28.1, health: 52, color: "#FF5252", risk: "High" },
  { id: "mediterranean", name: "Mediterranean", lat: 36, lng: 18, temp: 20.4, health: 61, color: "#FFB300", risk: "Elevated" },
  { id: "coral-triangle", name: "Coral Triangle", lat: 0, lng: 125, temp: 29.2, health: 48, color: "#FF5252", risk: "Critical" },
  { id: "benguela", name: "Benguela Current", lat: -25, lng: 10, temp: 16.5, health: 74, color: "#00D2D3", risk: "Low" },
];

function MapController() {
  const map = useMap();
  React.useEffect(() => {
    map.setView([20, 0], 2);
  }, [map]);
  return null;
}

export default function OceanMap({ compact = false }) {
  return (
    <div className={`relative rounded-xl overflow-hidden border border-border/40 ${compact ? "h-64" : "h-[450px] lg:h-[550px]"}`}>
      <MapContainer
        center={[20, 0]}
        zoom={2}
        minZoom={2}
        maxZoom={6}
        scrollWheelZoom={true}
        className="w-full h-full"
        style={{ background: "#041C32" }}
      >
        <MapController />
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png"
          attribution='&copy; CartoDB'
        />
        {oceanRegions.map((region) => (
          <CircleMarker
            key={region.id}
            center={[region.lat, region.lng]}
            radius={compact ? 6 : 10}
            pathOptions={{
              color: region.color,
              fillColor: region.color,
              fillOpacity: 0.5,
              weight: 2,
              opacity: 0.8,
            }}
          >
            <Popup className="ocean-popup">
              <div className="p-1 min-w-[180px]">
                <h3 className="font-bold text-sm mb-1.5">{region.name}</h3>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Temperature</span>
                    <span className="font-medium">{region.temp}°C</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Health Score</span>
                    <span className="font-medium">{region.health}/100</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Risk Level</span>
                    <span className="font-medium" style={{ color: region.color }}>{region.risk}</span>
                  </div>
                </div>
                <Link
                  to={`/region/${region.id}`}
                  className="block mt-2 text-center text-xs py-1.5 rounded-md bg-[#006EE6] text-white hover:bg-[#006EE6]/80 transition-colors"
                >
                  View Details →
                </Link>
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
      {/* Thermal effect overlay on map */}
      <div className="absolute inset-0 pointer-events-none rounded-xl" style={{
        background: "radial-gradient(ellipse at 65% 55%, rgba(255,82,82,0.06) 0%, transparent 40%), radial-gradient(ellipse at 30% 40%, rgba(0,210,211,0.05) 0%, transparent 40%)"
      }} />
    </div>
  );
}

export { oceanRegions };