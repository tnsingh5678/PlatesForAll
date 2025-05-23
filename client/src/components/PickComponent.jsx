import React, { useContext, useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import axios from "axios"
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import { UserContext } from '../context/UserContext';
import { LocationContext } from '../context/LocationContext';

// Fix default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const Routing = ({ source, destination }) => {
  const map = useMap();
  const routingControlRef = useRef(null);

  useEffect(() => {
    if (!map || !source || !destination) return;

    // Remove existing route if any
    if (routingControlRef.current) {
      map.removeControl(routingControlRef.current);
    }

    // Create new route with navigation panel
    routingControlRef.current = L.Routing.control({
      waypoints: [
        L.latLng(source.lat, source.lng),
        L.latLng(destination.lat, destination.lng),
      ],
      routeWhileDragging: false,
      show: true, // 👈 show the navigation panel
      addWaypoints: false,
      draggableWaypoints: false,
      createMarker: () => null,
      lineOptions: {
        styles: [{ color: 'blue', weight: 5 }]
      }
    }).addTo(map);

    return () => {
      if (routingControlRef.current) {
        map.removeControl(routingControlRef.current);
      }
    };
  }, [map, source, destination]);

  return null;
};


const PathFinderMap = () => {
    const [source, setSource] = useState({ lat: 31.7686, lng: 76.57454 });
    const [destination, setDestination] = useState(null);
    const { user } = useContext(UserContext);
    const { lat , lon} = useContext(LocationContext);

    useEffect(() => {
      if (lat && lon) {
        setSource({ lat, lng: lon });
      }
    }, [lat, lon]);
  
    useEffect(() => {
      const fetchDestination = async () => {
        try {
          const response = await axios.get(`https://platesforall.onrender.com/location/volunteer/${user.userId}`);
          setDestination(response.data.destination);
          console.log("Destination:", response.data.destination);
        } catch (error) {
          console.error("Failed to fetch destination:", error);
        }
      };
      fetchDestination();
    }, [user.userId]);
  
    useEffect(() => {
      const updateLocation = () => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (pos) => {
              const { latitude, longitude } = pos.coords;
              setSource({ lat: latitude, lng: longitude });
              console.log("Updated source:", latitude, longitude);
            },
            (err) => console.error("Geolocation error:", err.message)
          );
        }
      };
  
      updateLocation();
      const interval = setInterval(updateLocation, 30000);
  
      return () => clearInterval(interval);
    }, []);
  
    return (
      <div className='pt-20'>
        <MapContainer
        center={[source.lat, source.lng]}
        zoom={10}
        style={{ height: '80vh', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
  
        <Marker position={[source.lat, source.lng]}>
          <Popup>Source Location (Updated Every 30s)</Popup>
        </Marker>
  
        {destination && (
          <>
            <Marker position={[destination.lat, destination.lng]}>
              <Popup>Destination Location</Popup>
            </Marker>
            <Routing source={source} destination={destination} />
          </>
        )}
      </MapContainer>
      </div>
    );
};
  

export default PathFinderMap;
