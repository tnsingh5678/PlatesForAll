import React from 'react';
import { FaPhoneAlt, FaEnvelope, FaLocationArrow } from 'react-icons/fa'; // Importing icons from react-icons

const Contact = () => {
    return (
        <div className="bg-gray-100 min-h-screen py-12">
            <div className="max-w-4xl mx-auto px-6 md:px-12">
                <h1 className="text-4xl font-semibold text-center text-gray-800 mb-8">Contact Us</h1>
                <div className="bg-white shadow-lg rounded-lg p-8">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Get in Touch</h2>
                    <p className="text-gray-600 mb-6">We'd love to hear from you! Feel free to reach out using the contact methods below.</p>

                    {/* Contact Icons */}
                    <div className="space-y-4">
                        <div className="flex items-center">
                            <FaPhoneAlt className="text-yellow-500 text-2xl mr-4" />
                            <span className="text-gray-700 text-lg">+91 98765 43210</span>
                        </div>
                        <div className="flex items-center">
                            <FaEnvelope className="text-yellow-500 text-2xl mr-4" />
                            <span className="text-gray-700 text-lg">support@platesforall.org</span>
                        </div>
                        <div className="flex items-center">
                            <FaLocationArrow className="text-yellow-500 text-2xl mr-4" />
                            <span className="text-gray-700 text-lg">IIIT UNA , Una Himachal</span>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="mt-8">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Send us a Message</h2>
                        <form>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input
                                    type="text"
                                    className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                    placeholder="Your Name"
                                />
                                <input
                                    type="email"
                                    className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                    placeholder="Your Email"
                                />
                            </div>
                            <textarea
                                className="border border-gray-300 rounded-lg p-3 w-full mt-4 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                placeholder="Your Message"
                                rows="4"
                            ></textarea>
                            <button
                                type="submit"
                                className="bg-yellow-500 text-white py-3 px-6 rounded-lg mt-6 hover:bg-yellow-600 transition duration-300"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
