import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';

const Footer = () => {
  const { user } = useContext(UserContext);
  
  return (
    user && (
      <section id="footer" className="bg-black text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* About Section */}
            <div className="footer-section about">
              <h1 className="text-3xl font-bold mb-4">
                <span className="text-yellow-400">Plates</span> For All
              </h1>
              <p className="mb-4">Helping communities reduce food waste and feed those in need.</p>
              <div className="contact space-y-2">
                <span className="block"><i className="fas fa-phone"></i> +91 98765 43210</span>
                <span className="block"><i className="fas fa-envelope"></i> support@platesforall.org</span>
              </div>

              <div className="socials mt-4 space-x-4">
                <a href="#" target="_blank" rel="noreferrer">
                  <i className="fab fa-facebook text-xl"></i>
                </a>
                <a href="#" target="_blank" rel="noreferrer">
                  <i className="fab fa-instagram text-xl"></i>
                </a>
                <a href="#" target="_blank" rel="noreferrer">
                  <i className="fab fa-linkedin text-xl"></i>
                </a>
                <a href="#" target="_blank" rel="noreferrer">
                  <i className="fab fa-youtube text-xl"></i>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="footer-section links">
              <h2 className="text-2xl font-semibold mb-4">Quick Links</h2>
              <ul className="space-y-2">
                <li><a href="#home" className="hover:underline">Home</a></li>
                <li><a href="#about" className="hover:underline">About Us</a></li>
                <li><a href="#donate" className="hover:underline">Donate</a></li>
                <li><a href="#volunteer" className="hover:underline">Volunteer</a></li>
                <li><a href="#contact" className="hover:underline">Contact</a></li>
              </ul>
            </div>

            {/* Location Section */}
            <div className="footer-section">
              <h2 className="text-2xl font-semibold mb-4">Our Location</h2>
              <iframe
                src="https://www.google.com/maps/embed?..."
                width="100%"
                height="250"
                className="border-0"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          <div className="footer-bottom text-center mt-8">
            &copy; 2025 Plates For All | Designed by Akshit || Mohit || Tripurari
          </div>
        </div>
      </section>
    )
  );
};

export default Footer;
