import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "./UserContext";

const LocationContext = createContext();

const LocationProvider = ({ children }) => {
    const [coords, setCoords] = useState(null); 
    const [lat, setLat] = useState(null);
    const [lon, setLon] = useState(null);
    const [message, setMessage] = useState('');
    const { user } = useContext(UserContext);
    
    // Check if user is loaded and has userId
    const userId = user ? user.userId : null;

    // Function to get the user's current position
    const getCurrentPosition = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setLat(latitude);  // Set latitude state
                    setLon(longitude); // Set longitude state
                    setCoords([latitude, longitude]); // Set coordinates directly
                },
                (error) => {
                    setMessage('Error retrieving location: ' + error.message);
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

    // Effect hook that runs once to get the current position when user is loaded
    useEffect(() => {
        if (userId) {
            getCurrentPosition();  // Get the user's position when the component mounts and userId is available
        }
    }, [userId]); // Dependency on userId ensures location is fetched once user is available

    // Effect hook to send the location to the server after lat/lon are available
    useEffect(() => {
        if (lat && lon && userId) {
            const sendLocation = async () => {
                try {
                    console.log("Sending location:", { lat, lon, userId }); // Log to verify values
                    const response = await axios.post('https://platesforall.onrender.com/location/setLocation', {
                        lat,
                        lon,
                        userId
                    });
                    console.log("Location sent successfully:", response);
                } catch (error) {
                    setMessage('Error sending location: ' + error.message);
                    console.error(error);
                }
            };

            sendLocation(); // Send location to the server
        } else {
            console.log("Waiting for location to be set...");
        }
    }, [lat, lon, userId]); // This hook runs when lat, lon, or userId changes

    return (
        <LocationContext.Provider value={{ coords, setCoords, lat, lon, message }}>
            {children}
        </LocationContext.Provider>
    );
};

export { LocationContext, LocationProvider };
