import React, { useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from './context/UserContext';
import { AcceptedRequestContext } from './context/AcceptedRequestContext';
import { LocationContext } from './context/LocationContext';
import { useNavigate } from "react-router-dom";

const PickDonation = () => {
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const { lat, lon } = useContext(LocationContext);
    const { acceptedRequest } = useContext(AcceptedRequestContext);
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

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
            setTimeout(() => navigate('/mapd'), 1500); // slight delay before redirect
        } catch (error) {
            setMessage(error.response?.data?.message || 'An error occurred while picking the donation.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200">
            <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg space-y-6">
                <h2 className="text-3xl font-bold text-center text-blue-700">Confirm Pickup</h2>
                <p className="text-center text-gray-600">We’ll use your current location to pick up this donation.</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <button
                        type="submit"
                        className={`w-full py-3 px-4 text-white font-semibold rounded-lg transition-all ${
                            loading ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                        }`}
                        disabled={loading}
                    >
                        {loading ? 'Processing...' : 'Confirm & Pick Donation'}
                    </button>
                </form>

                {message && (
                    <div className={`p-3 text-center rounded-lg ${
                        message.toLowerCase().includes('success') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                        {message}
                    </div>
                )}
            </div>
        </div>
    );
};

export default PickDonation;
