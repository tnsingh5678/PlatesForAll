import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const About = () => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  return (
    <section className="bg-green-100 text-gray-800 py-12 px-6 md:px-12">
      <div className="container mx-auto">

        {/* About Content */}
        <h1 className="text-4xl font-bold text-green-700 text-center mb-8">
          About <span className="text-green-500">Food Rescue</span>
        </h1>

        {/* Image Slider */}
        <div className="mb-8">
          <Slider {...sliderSettings} className="rounded-lg overflow-hidden">
            <div>
              <img
              
                src="https://live.staticflickr.com/2873/11961804264_96a1b53e2d_b.jpg"
                alt="Food Donation"
                className="w-full h-140 object-cover object-center"
              />
            </div>
            <div>
              <img
                src="https://files.globalgiving.org/pfil/26417/pict_featured_jumbo.jpg?t=1483722486000"
                alt="Volunteers Helping"
                className="w-full h-140 object-cover object-center"
              />
            </div>
            <div>
              <img
                src="https://files.globalgiving.org/pfil/17590/Donation_for_charity_of_oldagehome_in_india_for_daily_needs_Large.JPG?m=1543980325000"
                alt="Feeding the Hungry"
                className="w-full h-140 object-cover object-center"
              />
            </div>
          </Slider>
        </div>

       

        {/* Mission & Vision */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-green-600 mb-4">Our Mission</h2>
          <p className="text-lg leading-relaxed">
            At <strong>Food Rescue</strong>, our mission is to reduce food waste and ensure surplus food reaches those in need. 
            We collaborate with restaurants, grocery stores, and individuals to collect excess food and distribute it to shelters and 
            underprivileged communities.
          </p>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-green-600 mb-4">Our Vision</h2>
          <p className="text-lg leading-relaxed">
            We envision a world where no food goes to waste, and every individual has access to nutritious meals. By raising awareness 
            and leveraging technology, we aim to bridge the gap between surplus and scarcity.
          </p>
        </div>

        {/* Impact Section */}
        <div className="bg-green-300 p-6 rounded-lg shadow-lg text-center mb-12">
          <h2 className="text-2xl font-semibold text-green-900 mb-4">Our Impact</h2>
          <p className="text-lg">
            Since our inception, we have successfully redistributed over <strong>50,000 meals</strong> and partnered with more than 
            <strong> 200 donors</strong> to fight hunger and minimize food waste.
          </p>
        </div>

        {/* How You Can Help */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-6 bg-white shadow-md rounded-lg">
            <h3 className="text-xl font-semibold text-green-700 mb-2">Donate Food</h3>
            <p>Have surplus food? Let us know, and we'll ensure it reaches those in need.</p>
          </div>
          <div className="p-6 bg-white shadow-md rounded-lg">
            <h3 className="text-xl font-semibold text-green-700 mb-2">Volunteer</h3>
            <p>Join our team to help with food collection, distribution, and awareness campaigns.</p>
          </div>
          <div className="p-6 bg-white shadow-md rounded-lg">
            <h3 className="text-xl font-semibold text-green-700 mb-2">Spread Awareness</h3>
            <p>Educate your community about food waste and encourage sustainable practices.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;