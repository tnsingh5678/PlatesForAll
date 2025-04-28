import React, { useState, useEffect , useContext} from 'react';
import axios from 'axios';
import { UserContext } from './context/UserContext';
import { AcceptedRequestContext } from './context/AcceptedRequestContext';

const PickDonation = ({ volunteerId, donationId }) => {
    const [lat, setLat] = useState('');
    const [lon, setLon] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const { acceptedRequest, setAcceptedRequest } = useContext(AcceptedRequestContext);
 
    const {user} = useContext(UserContext);
    console.log(acceptedRequest)

    // Function to get the current position
    const getCurrentPosition = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setLat(latitude);
                    setLon(longitude);
                },
                (error) => {
                    setMessage('Error retrieving location');
                    console.error(error);
                },
                {
                    enableHighAccuracy: true,
                    timeout: 5000,
                    maximumAge: 0,
                }
            );
        } else {
            setMessage('Geolocation is not supported by this browser.');
        }
    };

    // Use effect to get the current location when the component mounts
    useEffect(() => {
        getCurrentPosition();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            const response = await axios.post(
                `http://localhost:4000/donation/pick/${user.userId}/${acceptedRequest}`,
                { Lat: lat, Lon: lon }
            );
            setMessage(response.data.message);
        } catch (error) {
            setMessage(error.response ? error.response.data.message : 'Error while picking the item');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4 text-center">Pick Donation</h2>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="lat" className="block text-sm font-medium text-gray-700">Latitude</label>
                        <input
                            type="number"
                            id="lat"
                            value={lat}
                            onChange={(e) => setLat(e.target.value)}
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="lon" className="block text-sm font-medium text-gray-700">Longitude</label>
                        <input
                            type="number"
                            id="lon"
                            value={lon}
                            onChange={(e) => setLon(e.target.value)}
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <button
                            type="submit"
                            className={`w-full py-2 px-4 text-white font-semibold rounded-md ${loading ? 'bg-gray-500' : 'bg-blue-500 hover:bg-blue-600'}`}
                            disabled={loading}
                        >
                            {loading ? 'Processing...' : 'Pick Donation'}
                        </button>
                    </div>

                    {message && (
                        <div className={`mt-4 p-2 text-center ${message.includes('successfully') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                            {message}
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default PickDonation;
