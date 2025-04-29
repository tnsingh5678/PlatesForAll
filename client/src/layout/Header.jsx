import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from 'react-toastify';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const { user, setUser } = useContext(UserContext);

    const logoutHandler = () => {
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
        toast.success("Logged out successfully");
        setUser(null);
        navigate('/Login');
    };

    return (
        <div>
            {/* Navbar */}
            {user && (
                <nav className="bg-white shadow-md p-2 flex justify-between items-center fixed w-full top-0 z-10">
                    <div className="flex items-center">
                        <img src="https://res.cloudinary.com/dsyr09l1n/image/upload/v1740598517/PlatesForAll_1_ew1lqi.png" alt="logo" height={80} width={80} />
                    </div>
                    <div className="hidden md:flex space-x-4">
                        <Link to="/" className="bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-yellow-600 transition duration-300">Home</Link>
                        <Link to="/about" className="bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-yellow-600 transition duration-300">About</Link>
                        <Link to="/programs" className="bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-yellow-600 transition duration-300">Programs</Link>
                        <Link to="/contact" className="bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-yellow-600 transition duration-300">Contact</Link>
                        <Link to="/pick" className="bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-yellow-600 transition duration-300">Pick</Link>
                        <Link to="/drop" className="bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-yellow-600 transition duration-300">Drop</Link>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Link to="/donate" className="bg-yellow-500 text-white px-4 py-2 rounded-lg hidden md:block hover:bg-yellow-600 transition duration-300">
                            Donate Now
                        </Link>
                        <button className="md:hidden text-2xl" onClick={() => setIsOpen(!isOpen)}>
                            ☰
                        </button>
                        <button className="bg-red-600 m-2 p-2 border rounded-lg" onClick={logoutHandler}>Logout</button>
                    </div>
                </nav>
            )}

            {/* Mobile Menu */}
            {isOpen && user && (
                <div className="md:hidden flex flex-col items-center bg-white shadow-md p-4 fixed w-full top-16 left-0">
                    <Link to="/" className="hover:text-yellow-500 py-2 w-full text-center border-b">Home</Link>
                    <Link to="/about" className="hover:text-yellow-500 py-2 w-full text-center border-b">About</Link>
                    <Link to="/programs" className="hover:text-yellow-500 py-2 w-full text-center border-b">Programs</Link>
                    <Link to="/contact" className="hover:text-yellow-500 py-2 w-full text-center border-b">Contact</Link>
                    <Link to="/donate" className="bg-yellow-500 text-white px-4 py-2 rounded-lg mt-4 hover:bg-yellow-600 transition duration-300">
                        Donate Now
                    </Link>
                    <button className="bg-red-600 m-2 p-2 border rounded-lg" onClick={logoutHandler}>Logout</button>
                </div>
            )}
        </div>
    );
};

export default Header;
