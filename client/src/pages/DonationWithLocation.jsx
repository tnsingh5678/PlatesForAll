import React, { useState, useContext, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import axios from 'axios';
import { toast } from 'react-toastify';
import { UserContext } from '../context/UserContext';
import { VolunteerContext } from '../context/VolunteerContext';
import { LocationContext } from '../context/LocationContext';

// Fix Leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Predefined drop-off points
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

const DonationWithLocation = () => {
  const [food, setFood] = useState('');
  const [category, setCategory] = useState([]);
  const [donorId, setDonorId] = useState('');
  const [selectedPoint, setSelectedPoint] = useState(null);

  const { user } = useContext(UserContext);
  const { coords} = useContext(LocationContext)

  const {volunteers , setVolunteers} = useContext(VolunteerContext)

  useEffect(() => {
    console.log("Current volunteers in Component:", volunteers);
    
  }, [volunteers]);

  useEffect(() => {
    setDonorId(user.userId);
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedPoint) {
      toast.error('Please select a drop-off location');
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:4000/donation/donor/${donorId}`,
        {
          food,
          category,
          address: selectedPoint.address, // Automatically pass the selected point address
          coordinates: selectedPoint.coordinates, // Pass coordinates from the selected point
        }
      );

      if (response.status === 200) {
        console.log("Starting",response);

        toast.success('Donation successfully submitted!');
        if (response.status === 200) {
        const data = response.data;
        console.log("Donation submitted:", data);
        toast.success("You have succesfully donated food");
        const res = await axios.post('http://localhost:4000/donation/find',{
          latitude : coords[0].toString(),
          longitude : coords[1].toString(),
          DonationId : data.donation._id
        })
        // data is consoled correctly but why Volunteer not setting
        console.log("data",res.data);
        localStorage.setItem('volunteers', JSON.stringify(res.data.Locations));
        setVolunteers(res.data.Locations);
        console.log("Nearby volunteers:", res.data.Locations);
        if (res.data && res.data.Locations) {
            setVolunteers(res.data.Locations);
              // Update context state with the volunteers' data
            
        }else {
            toast.error("No volunteers found nearby.");
        }
        

        // setFood("");
        // setAddress("");
        // setCategory();
      } else {

        toast.error("Error while donating food");
        console.error("Error submitting donation:", data.message || "Unknown error");
      }
        setFood('');
        setCategory([]);
        setSelectedPoint(null);

      } else {
        toast.error('Error submitting donation');
      }
    } catch (error) {
      toast.error('Error submitting donation');
      console.error(error);
    }
  };

  return (
    <div className="pt-20 px-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-indigo-700">Donate Food & Select Drop-off Point</h1>

      {/* Donation Form */}
      <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto mb-10">
        <form onSubmit={handleSubmit} className="space-y-6">
          <input type="hidden" value={donorId} />

          <div>
            <label className="block text-sm font-medium text-gray-700">Type of Food</label>
            <input
              type="text"
              value={food}
              onChange={(e) => setFood(e.target.value)}
              className="w-full mt-1 p-2 border rounded"
              placeholder="Enter food type"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Food Category</label>
            <select
              multiple
              value={category}
              onChange={(e) => setCategory([...e.target.selectedOptions].map(opt => opt.value))}
              className="w-full mt-1 p-2 border rounded"
            >
              <option value="Vegetables">Vegetables</option>
              <option value="Fruits">Fruits</option>
              <option value="Grains">Grains</option>
              <option value="Protein">Protein</option>
              <option value="Dairy">Dairy</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white p-3 rounded hover:bg-indigo-700"
          >
            Submit Donation
          </button>
        </form>
      </div>

      {/* Drop-off Map & List */}
      <div className="mb-16">
        <MapContainer center={[31.4753, 76.2711]} zoom={11} style={{ height: '60vh', width: '100%' }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {donationPoints.map((point) => (
            <Marker key={point.id} position={[point.coordinates.lat, point.coordinates.lng]}>
              <Popup>
                <strong>{point.name}</strong>
                <br />
                {point.address}
              </Popup>
            </Marker>
          ))}
        </MapContainer>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          {donationPoints.map((point) => (
            <div
              key={point.id}
              className={`p-4 rounded shadow border ${
                selectedPoint?.id === point.id ? 'border-indigo-600 bg-indigo-50' : ''
              }`}
            >
              <h3 className="font-semibold">{point.name}</h3>
              <p className="text-sm">{point.address}</p>
              <button
                onClick={() => setSelectedPoint(point)}
                className="mt-2 px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Select This Point
              </button>
            </div>
          ))}
        </div>

        {selectedPoint && (
          <div className="text-center mt-4 text-green-700 font-semibold">
            ✅ Selected Drop Point: {selectedPoint.name}
          </div>
        )}
      </div>
    </div>
  );
};

export default DonationWithLocation;
