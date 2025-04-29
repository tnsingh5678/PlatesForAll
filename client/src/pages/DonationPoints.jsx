import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix marker icon issue with Leaflet in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const donationPoints = [
  {
    id: 1,
    name: 'Shree Ram Orphanage',
    address: 'Ward No. 5, Una Town, Himachal Pradesh 174303',
    coordinates: { lat: 31.4753, lng: 76.2711 },
  },
  {
    id: 2,
    name: 'Uma Shankar Shelter',
    address: 'Near Bus Stand, Una, Himachal Pradesh 174303',
    coordinates: { lat: 31.4690, lng: 76.2700 },
  },
  {
    id: 3,
    name: 'Bal Ashram Charitable Trust',
    address: 'Village Malahat, Tehsil Amb, Una HP 177203',
    coordinates: { lat: 31.5684, lng: 76.1772 },
  },
];

const DonationPointsPage = () => {
  const [selected, setSelected] = useState(null);

  return (
    <div className="p-8 pt-20">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Donation Drop-off Points in Una, Himachal Pradesh
      </h1>

      {/* Map */}
      <MapContainer
        center={[31.4753, 76.2711]}
        zoom={11}
        style={{ height: '60vh', width: '100%' }}
        className="mb-8"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        {donationPoints.map((point) => (
          <Marker
            key={point.id}
            position={[point.coordinates.lat, point.coordinates.lng]}
          >
            <Popup>
              <strong>{point.name}</strong>
              <br />
              {point.address}
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* List of locations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {donationPoints.map((point) => (
          <div
            key={point.id}
            className="bg-white shadow-md rounded p-4 hover:border-blue-500 border transition"
          >
            <h2 className="text-xl font-semibold">{point.name}</h2>
            <p className="text-gray-700">{point.address}</p>
            <button
              onClick={() => setSelected(point)}
              className="mt-3 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Select Drop Point
            </button>
          </div>
        ))}
      </div>

      {/* Confirmation */}
      {selected && (
        <div className="mt-6 p-4 bg-green-100 text-green-800 rounded text-center">
          Selected: <strong>{selected.name}</strong> (
          {selected.address})
        </div>
      )}
    </div>
  );
};

export default DonationPointsPage;
