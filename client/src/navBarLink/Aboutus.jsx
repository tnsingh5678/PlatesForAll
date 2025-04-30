import React from "react";
import { motion } from "framer-motion";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const About = () => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    pauseOnHover: true,
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.3 },
    }),
  };

  return (
    <section className="bg-gradient-to-b from-green-100 to-white text-gray-800 py-12 px-6 md:px-12 overflow-hidden">
      <motion.div
        className="container mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* About Title */}
        <motion.h1
          className="text-4xl font-bold text-green-700 text-center mb-12"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          About <span className="text-green-500">Food Rescue</span>
        </motion.h1>

        {/* Image Slider */}
        <motion.div
  className="mb-12 rounded-xl overflow-hidden shadow-2xl"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 1.2 }}
>
  <div className="w-full h-[600px] md:h-[700px] mx-auto rounded-xl overflow-hidden">
    <Slider {...sliderSettings}>
      {[
        "https://live.staticflickr.com/2873/11961804264_96a1b53e2d_b.jpg",
        "https://files.globalgiving.org/pfil/26417/pict_featured_jumbo.jpg?t=1483722486000",
        "https://files.globalgiving.org/pfil/17590/Donation_for_charity_of_oldagehome_in_india_for_daily_needs_Large.JPG?m=1543980325000",
      ].map((src, index) => (
        <div key={index}>
          <img
            src={src}
            alt={`Slide ${index}`}
            className="w-full h-[600px] md:h-[700px] object-cover object-center"
          />
        </div>
      ))}
    </Slider>
  </div>
</motion.div>


        {/* Mission & Vision */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-2xl font-semibold text-green-600 mb-4">Our Mission</h2>
          <p className="text-lg leading-relaxed">
            At <strong>Food Rescue</strong>, our mission is to reduce food waste and ensure surplus food reaches those in need. 
            We collaborate with restaurants, grocery stores, and individuals to collect excess food and distribute it to shelters and underprivileged communities.
          </p>
        </motion.div>

        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-2xl font-semibold text-green-600 mb-4">Our Vision</h2>
          <p className="text-lg leading-relaxed">
            We envision a world where no food goes to waste, and every individual has access to nutritious meals. 
            By raising awareness and leveraging technology, we aim to bridge the gap between surplus and scarcity.
          </p>
        </motion.div>

        {/* Impact Section */}
        <motion.div
          className="bg-green-300 p-6 rounded-lg shadow-lg text-center mb-12"
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-2xl font-semibold text-green-900 mb-4">Our Impact</h2>
          <p className="text-lg">
            Since our inception, we have successfully redistributed over <strong>50,000 meals</strong> and partnered with more than <strong>200 donors</strong> to fight hunger and minimize food waste.
          </p>
        </motion.div>

        {/* How You Can Help */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {["Donate Food", "Volunteer", "Spread Awareness"].map((title, index) => (
            <motion.div
              className="p-6 bg-white shadow-md rounded-lg"
              key={index}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-semibold text-green-700 mb-2">{title}</h3>
              <p>
                {title === "Donate Food" && "Have surplus food? Let us know, and we'll ensure it reaches those in need."}
                {title === "Volunteer" && "Join our team to help with food collection, distribution, and awareness campaigns."}
                {title === "Spread Awareness" && "Educate your community about food waste and encourage sustainable practices."}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default About;