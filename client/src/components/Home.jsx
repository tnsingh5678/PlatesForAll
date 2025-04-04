import React, { useState } from "react";

const HomePage = () => {
  
  return (

    <div className="bg-gray-100 text-gray-900 mt-30">
 

      <header 
  className="relative w-full h-screen flex items-center justify-center text-white text-center "
  style={{

    backgroundImage: "url('https://th.bing.com/th/id/R.b6ec21aad1cacc5ba925ec572a3c059b?rik=AJUG9k3zJvoNNA&riu=http%3a%2f%2fwww.developmentnews.in%2fwp-content%2fuploads%2f2017%2f11%2fFeeding-India.jpg&ehk=7H8aLzbqHgrniGsFCJ1wp%2bIBljlM7W6nQoryZnQI6v0%3d&risl=&pid=ImgRaw&r=0')",
    backgroundSize: "cover",
    backgroundPosition: "top center",
  }}
>
  <div className="bg-black bg-opacity-30 p-10 rounded-lg">
    <h1 className="text-5xl font-bold">Join Us in Fighting Hunger</h1>
    <p className="text-xl mt-4">Every meal counts. Help us make a difference today.</p>
    <div className="mt-6">
      <button className="bg-yellow-500 text-white px-6 py-3 rounded-lg mr-4 hover:bg-yellow-600 transition duration-300">Donate Now</button>
      <button className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-300">Get Involved</button>
    </div>
  </div>
</header>


      {/* About Section */}
      <section className="text-center py-16 px-6 bg-white">
        <h2 className="text-4xl font-bold">About Us</h2>
        <p className="text-lg text-gray-600 mt-4">We are dedicated to ending hunger by providing meals to those in need.</p>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-gray-200 text-center">
        <h2 className="text-4xl font-bold">How It Works</h2>
        <div className="flex justify-center mt-8 space-x-6">
          <div className="bg-white p-6 shadow-lg rounded-lg w-1/4">
            <h3 className="text-xl font-semibold">Donate</h3>
            <p className="text-gray-600">Your donations help provide meals.</p>
          </div>
          <div className="bg-white p-6 shadow-lg rounded-lg w-1/4">
            <h3 className="text-xl font-semibold">Distribute</h3>
            <p className="text-gray-600">We deliver food to those in need.</p>
          </div>
          <div className="bg-white p-6 shadow-lg rounded-lg w-1/4">
            <h3 className="text-xl font-semibold">Impact</h3>
            <p className="text-gray-600">Helping communities fight hunger.</p>
          </div>
        </div>
      </section>

      {/* Featured Programs */}
      <section className="py-16 text-center bg-white">
        <h2 className="text-4xl font-bold">Our Programs</h2>
        <div className="flex justify-center mt-8 space-x-6">
          <div className="bg-gray-100 p-6 rounded-lg w-1/3">
            <h3 className="text-xl font-semibold">Meals for Kids</h3>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg w-1/3">
            <h3 className="text-xl font-semibold">Food for the Homeless</h3>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-200 text-center">
        <h2 className="text-4xl font-bold">What People Say</h2>
        <p className="text-lg text-gray-600 mt-4">Real stories from those we've helped.</p>
      </section>

      
      
    </div>
  );
};

export default HomePage;