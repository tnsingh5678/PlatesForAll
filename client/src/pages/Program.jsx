import React from 'react';
import { motion } from 'framer-motion';

const Programs = () => {
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (custom) => ({
      opacity: 1,
      y: 0,
      transition: { delay: custom * 0.3, duration: 0.8 },
    }),
  };

  return (
    <section id="programs" className="py-16 bg-gradient-to-b from-gray-100 to-white overflow-hidden">
      <motion.div
        className="container mx-auto px-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.3,
            },
          },
        }}
      >
        <motion.h1
          className="text-4xl font-bold text-center text-blue-600 mb-12"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Our Programs
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* Program 1 */}
          <motion.div
            className="bg-white shadow-lg p-6 rounded-xl hover:shadow-2xl transition duration-300"
            custom={0}
            variants={cardVariants}
          >
            <img
              src="https://res.cloudinary.com/dsyr09l1n/image/upload/v1740599544/food_distribution_ngkxjp.jpg"
              alt="Program 1"
              className="mb-4 rounded-lg w-full h-60 object-cover object-center"
            />
            <h2 className="text-2xl font-semibold text-blue-500 mb-2">Food Distribution</h2>
            <p className="text-gray-700">
              We distribute food to underprivileged communities, helping to reduce food waste while providing meals to those in need.
            </p>
          </motion.div>

          {/* Program 2 */}
          <motion.div
            className="bg-white shadow-lg p-6 rounded-xl hover:shadow-2xl transition duration-300"
            custom={1}
            variants={cardVariants}
          >
            <img
              src="https://res.cloudinary.com/dsyr09l1n/image/upload/v1740599935/Community_outreach_1_ggbzse.jpg"
              alt="Program 2"
              className="mb-4 rounded-lg w-full h-60 object-cover object-center"
            />
            <h2 className="text-2xl font-semibold text-blue-500 mb-2">Community Outreach</h2>
            <p className="text-gray-700">
              We engage with local communities to raise awareness about food waste and teach sustainable practices to minimize waste.
            </p>
          </motion.div>

          {/* Program 3 */}
          <motion.div
            className="bg-white shadow-lg p-6 rounded-xl hover:shadow-2xl transition duration-300"
            custom={2}
            variants={cardVariants}
          >
            <img
              src="https://res.cloudinary.com/dsyr09l1n/image/upload/v1740599833/volunteer_c02sm5.jpg"
              alt="Program 3"
              className="mb-4 rounded-lg w-full h-60 object-cover object-center"
            />
            <h2 className="text-2xl font-semibold text-blue-500 mb-2">Volunteer Opportunities</h2>
            <p className="text-gray-700">
              Our programs rely on dedicated volunteers who help with food collection, distribution, and outreach activities.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Programs;