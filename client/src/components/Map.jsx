import { useState, useEffect, useContext } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import "leaflet.markercluster";
import { LocationContext } from "../context/LocationContext";

// Fix for default marker icons
const DefaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

export default function Map() {
  const { coords } = useContext(LocationContext);

  const [marker] = useState({
    position: coords ? [Number(coords[0]), Number(coords[1])] : [0, 0],
  });

  const MapWithCluster = () => {
    const map = useMap();

    useEffect(() => {
      if (coords) {
        const markerClusterGroup = L.markerClusterGroup();

        const markers = [
          { position: [31.78, 76.287], content: "Marker 1" },
          { position: [31.79, 76.288], content: "Marker 2" },
          { position: [31.77, 76.286], content: "Marker 3" },
          { position: [coords[0], coords[1]], content: "Marker 4" },
        ];

        markers.forEach(({ position, content }) => {
          const marker = L.marker(position).bindPopup(content);
          markerClusterGroup.addLayer(marker);
        });

        map.addLayer(markerClusterGroup);

        return () => {
          map.removeLayer(markerClusterGroup);
        };
      }
    }, [map, coords]);

    return null;
  };

  if (!coords) {
    return (
      <div className="flex items-center justify-center h-screen w-screen bg-gray-100">
        <p className="text-lg font-medium text-gray-700">Loading map...</p>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen overflow-hidden pt-20">
      <MapContainer
        center={marker.position}
        zoom={13}
        className="h-full w-full"
        maxZoom={18}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; OpenStreetMap contributors'
          maxZoom={19}
        />
        <MapWithCluster />
      </MapContainer>
    </div>
  );
}
