import React, { useContext, useState } from 'react';
import axios from 'axios';
import { LocationContext } from '../context/LocationContext';
import { AcceptedRequestContext } from '../context/AcceptedRequestContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const DropDonation = () => {
    const { lat, lon } = useContext(LocationContext);
    const { acceptedRequest } = useContext(AcceptedRequestContext);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post(`https://platesforall.onrender.com/donation/drop/${acceptedRequest}`, {
                Lat: lat,
                Lon: lon,
            });

            if (response.status === 200) {
                toast.success("Donation successfully delivered!");
                setTimeout(() => navigate('/thankyou'), 1500); // optional redirect
            } else {
                toast.warning(response.data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error while dropping the donation');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gradient-to-br from-green-100 via-white to-green-200 pt-20">
            <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg text-center space-y-6">
                <h2 className="text-3xl font-bold text-green-700">Confirm Drop</h2>
                <p className="text-gray-600">Tap the button below to confirm delivery of the donation using your current location.</p>

                <form onSubmit={handleSubmit}>
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-3 px-4 text-white font-semibold rounded-lg transition ${
                            loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
                        }`}
                    >
                        {loading ? 'Processing...' : 'Confirm & Drop Donation'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default DropDonation;
