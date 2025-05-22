import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { AcceptedRequestContext } from '../context/AcceptedRequestContext';
import axios from "axios";

const UserRequests = () => {
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const { user , setUser } = useContext(UserContext);
  const { acceptedRequest, setAcceptedRequest } = useContext(AcceptedRequestContext);
  const navigate = useNavigate();

 

  // Fetch requests from the backend
  useEffect(() => {
    const fetchRequests = async () => {
      if (!user?.userId) {
        setError("User not found or userId is missing.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`https://platesforall.onrender.com:4000/user/findRequests/${user.userId}`, {
          headers: {
            'Content-Type': 'application/json',
            // Include other headers as needed
          },
        });

        if (response.data?.Request) {
          console.log(response.data.Request)
          setRequests(response.data.Request);
        } else {
          setError("No requests found.");
        }
      } catch (error) {
        setError(error.response?.data?.message || "An error occurred while fetching the requests.");
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [user]);

  // Accept a request
  const onAccept = async (reqId) => {
    try {
      const response = await axios.post(`https://platesforall.onrender.com:4000/donation/accept/${user.userId}/${reqId}`, {}, {
        headers: {
          'Content-Type': 'application/json',
          // Include other headers as needed
        },
      });

      if (response.data?.donation?._id) {
        setAcceptedRequest(response.data.donation._id);
        navigate('/mapc');
      } else {
        setError("Failed to accept the request.");
      }
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred while accepting the request.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-2xl font-semibold text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 pt-20">
      <h1 className="text-5xl font-extrabold text-center text-indigo-600 mb-16 tracking-wide transition-all duration-500 ease-in-out hover:text-indigo-700 transform hover:scale-105">
        Your Volunteering Requests
      </h1>

      {error && <div className="text-red-600 mb-6 text-center text-xl font-semibold">{error}</div>}

      {requests.length === 0 ? (
        <div className="text-center text-lg text-gray-500 font-medium">No requests found.</div>
      ) : (
        <div className="space-y-8">
          <ul className="space-y-6">
            {requests.map((request) => (
              <li key={request._id} className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-8 rounded-2xl shadow-xl transform hover:scale-105 transition-all duration-500 ease-in-out hover:shadow-2xl max-w-md mx-auto">
                <div className="flex flex-col space-y-4">
                  <div className="text-3xl font-extrabold text-white">{request.food}</div>
                  <div className="text-gray-100 text-lg font-semibold">{request.category}</div>
                  <div className="text-gray-200">{request.Address}</div>
                  <button
                    className="bg-white text-gray-800 text-lg font-semibold py-3 px-6 rounded-full shadow-lg hover:bg-gray-100 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-indigo-500 transition-all duration-300 ease-in-out"
                    onClick={() => onAccept(request._id)}
                  >
                    Accept Now
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserRequests;
