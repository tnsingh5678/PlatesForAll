import React, { useContext, useState } from 'react';
import axios from 'axios';
import { LocationContext } from './context/LocationContext';
import { AcceptedRequestContext } from './context/AcceptedRequestContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const DropDonation = () => {
    const { lat, lon } = useContext(LocationContext);
    const { acceptedRequest } = useContext(AcceptedRequestContext);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setLoading(true);

        try {
            const response = await axios.post(`http://localhost:4000/donation/drop/${acceptedRequest}`, {
                Lat: lat,
                Lon: lon,
            });

            setMessage(response.data.message);

            if (response.status === 200) {
                toast.success("Item delievered successfully")
            }
        } catch (error) {
            setMessage(error.response?.data?.message || 'Error while dropping the donation');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4 text-center">Drop Donation</h2>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="lat" className="block text-sm font-medium text-gray-700">Latitude</label>
                        <input
                            type="number"
                            id="lat"
                            value={lat}
                            readOnly
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md bg-gray-100"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="lon" className="block text-sm font-medium text-gray-700">Longitude</label>
                        <input
                            type="number"
                            id="lon"
                            value={lon}
                            readOnly
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md bg-gray-100"
                        />
                    </div>

                    <button
                        type="submit"
                        className={`w-full py-2 px-4 text-white font-semibold rounded-md ${loading ? 'bg-gray-500' : 'bg-green-500 hover:bg-green-600'}`}
                        disabled={loading}
                    >
                        {loading ? 'Processing...' : 'Drop Donation'}
                    </button>

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

export default DropDonation;
