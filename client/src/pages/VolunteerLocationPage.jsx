import { useContext , useEffect} from "react";
import { VolunteerContext } from "../context/VolunteerContext";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet"; // Import Leaflet
import "leaflet/dist/leaflet.css"; // Import Leaflet styles

export default function VolunteeringLocationPage() {
  const { volunteers } = useContext(VolunteerContext);
  useEffect(() => {
    console.log("Rendering volunteers:", volunteers);
  }, []);

  // Default center of the map (can be adjusted based on the first volunteer or some other logic)
  const defaultCenter = [51.505, -0.09]; // Example: Default center (London)

  return (
    <div style={{ height: "100vh" }}>
      <MapContainer
        center={defaultCenter} // Initial center of the map
        zoom={13} // Initial zoom level
        style={{ width: "100%", height: "100%" }} // Full screen width and height
      >
        {/* Tile Layer for the background of the map */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />

        {/* Loop through the volunteers and render each volunteer as a marker */}
        {volunteers.map((volunteer) => (
          <Marker
            key={volunteer.id} // Unique key for each marker (using volunteer id here)
            position={[volunteer.lat, volunteer.lng]} // Position of the marker based on volunteer's coordinates
            icon={new L.Icon({
              iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png", // Default marker icon
              iconSize: [25, 41], // Size of the icon
              iconAnchor: [12, 41], // Anchor point of the icon
            })}
          >
            {/* Popup showing volunteer details */}
            <Popup>
              <strong>{volunteer.name}</strong>
              <br />
              {volunteer.email}
              <br />
              Location: {volunteer.latitude}, {volunteer.longitude}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
