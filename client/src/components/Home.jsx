import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { FaHandHoldingHeart, FaAppleAlt, FaFish, FaBreadSlice, FaCarrot, FaHandsHelping } from "react-icons/fa";
import { MdOutlineFoodBank, MdElderly } from "react-icons/md";
import { IoIosBicycle } from "react-icons/io";
import { FaSchool } from "react-icons/fa";


const HomePage = () => {
  const navigate = useNavigate();
  const handleGetInvolvedClick = () => {
    navigate("/getinvolved");
  };
  
  const handleDonateClick = () => {
    navigate("/donate");
  };

  const steps = [
    { id: 1, title: "Create an Account", description: "Sign up as a donor or volunteer to start making a difference.", icon: <FaHandHoldingHeart size={40} /> },
    { id: 2, title: "Donate or Request Food", description: "Post food you wish to donate or request meals for your community.", icon: <MdOutlineFoodBank size={40} /> },
    { id: 3, title: "Volunteers Deliver", description: "Our dedicated volunteers collect and deliver food safely.", icon: <IoIosBicycle size={40} /> },
  ];

  const categories = [
    { id: 1, title: "Fruits & Vegetables", subTitle: "Fresh produce donations", icon: <FaAppleAlt size={35} /> },
    { id: 2, title: "Bakery Items", subTitle: "Breads, pastries, etc.", icon: <FaBreadSlice size={35} /> },
    { id: 3, title: "Cooked Meals", subTitle: "Hot, ready-to-eat meals", icon: <FaFish size={35} /> },
    { id: 4, title: "Dry Goods", subTitle: "Rice, grains, canned food", icon: <FaCarrot size={35} /> },
  ];

  const partners = [
    { id: 1, title: "Helping Hands NGO", location: "Mumbai, Maharashtra", support: "Food for Homeless", icon: <FaHandsHelping size={35} /> },
    { id: 2, title: "Sunrise Orphanage", location: "Delhi NCR", support: "Meals for Children", icon: <FaSchool size={35} /> },
    { id: 3, title: "Silver Age Home", location: "Bangalore, Karnataka", support: "Support for Elderly", icon: <MdElderly size={35} /> },
  ];

  const foodWasteData = [
    { country: "India", waste: 68 },
    { country: "USA", waste: 60 },
    { country: "China", waste: 91 },
    { country: "Brazil", waste: 27 },
    { country: "Indonesia", waste: 20 },
  ];

  return (
    <div className="bg-gradient-to-b from-gray-100 to-white text-gray-900">
      {/* Hero Section */}
      <header
        className="relative w-full h-screen flex items-center justify-center text-white text-center overflow-hidden"
        style={{
          backgroundImage: "url('https://th.bing.com/th/id/R.b6ec21aad1cacc5ba925ec572a3c059b?rik=AJUG9k3zJvoNNA&riu=http%3a%2f%2fwww.developmentnews.in%2fwp-content%2fuploads%2f2017%2f11%2fFeeding-India.jpg&ehk=7H8aLzbqHgrniGsFCJ1wp%2bIBljlM7W6nQoryZnQI6v0%3d&risl=&pid=ImgRaw&r=0')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="bg-black bg-opacity-40 p-10 rounded-lg"
        >
          <h1 className="text-5xl font-bold">Join Us in Fighting Hunger</h1>
          <p className="text-xl mt-4">
            Every meal counts. Help us make a difference today.
          </p>
          <div className="mt-6">
            <motion.button
              className="bg-yellow-500 text-white px-6 py-3 rounded-lg mr-4 hover:bg-yellow-600 transition-transform transform hover:scale-105"
              whileHover={{ scale: 1.1 }}
              onClick={handleDonateClick}
            >
              Donate Now
            </motion.button>
            <motion.button
              className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-transform transform hover:scale-105"
              whileHover={{ scale: 1.1 }}
              onClick={handleGetInvolvedClick}
            >
              Get Involved
            </motion.button>
          </div>
        </motion.div>
      </header>

      {/* How It Works */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.h2
            className="text-4xl font-bold text-center mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            How It Works
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-10">
            {steps.map((step) => (
              <motion.div
                key={step.id}
                className="bg-white p-8 rounded-xl shadow-md text-center hover:shadow-xl transition duration-300"
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex justify-center text-yellow-500 mb-4">{step.icon}</div>
                <h3 className="text-2xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-6">
          <motion.h2
            className="text-4xl font-bold text-center mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            Popular Donation Categories
          </motion.h2>
          <div className="grid md:grid-cols-4 gap-10">
            {categories.map((category) => (
              <motion.div
                key={category.id}
                className="bg-white p-8 rounded-xl shadow-md text-center hover:shadow-xl transition duration-300"
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex justify-center text-green-500 mb-4">{category.icon}</div>
                <h3 className="text-xl font-semibold">{category.title}</h3>
                <p className="text-gray-600">{category.subTitle}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Food Wastage Chart */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.h2
            className="text-4xl font-bold text-center mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            Global Food Wastage Statistics
          </motion.h2>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={foodWasteData} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="country" />
              <YAxis label={{ value: "Million Tons", angle: -90, position: "insideLeft" }} />
              <Tooltip />
              <Bar dataKey="waste" fill="#f59e0b" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Popular NGOs */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-6">
          <motion.h2
            className="text-4xl font-bold text-center mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            Our Partners
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-10">
            {partners.map((partner) => (
              <motion.div
                key={partner.id}
                className="bg-white p-8 rounded-xl shadow-md text-center hover:shadow-xl transition duration-300"
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex justify-center text-blue-500 mb-4">{partner.icon}</div>
                <h3 className="text-2xl font-semibold">{partner.title}</h3>
                <p className="text-gray-600">{partner.location}</p>
                <p className="text-green-600 font-medium mt-2">{partner.support}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;