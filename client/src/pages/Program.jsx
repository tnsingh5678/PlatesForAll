import React from 'react';

const Programs = () => {
  return (
    <section id="programs" className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">
          Our Programs
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Program 1 */}
          <div className="bg-white shadow-lg p-6 rounded-lg">
            <img src="https://res.cloudinary.com/dsyr09l1n/image/upload/v1740599544/food_distribution_ngkxjp.jpg" alt="Program 1" className="mb-4 rounded-lg" />
            <h2 className="text-2xl font-semibold text-blue-500 mb-2">Food Distribution</h2>
            <p className="text-gray-700">
              We distribute food to underprivileged communities, helping to reduce food waste while providing meals to those in need.
            </p>
          </div>

          {/* Program 2 */}
          <div className="bg-white shadow-lg p-6 rounded-lg">
            <img src="https://res.cloudinary.com/dsyr09l1n/image/upload/v1740599935/Community_outreach_1_ggbzse.jpg" alt="Program 2" className="mb-4 rounded-lg" />
            <h2 className="text-2xl font-semibold text-blue-500 mb-2">Community Outreach</h2>
            <p className="text-gray-700">
              We engage with local communities to raise awareness about food waste and teach sustainable practices to minimize waste.
            </p>
          </div>

          {/* Program 3 */}
          <div className="bg-white shadow-lg p-6 rounded-lg">
            <img src="https://res.cloudinary.com/dsyr09l1n/image/upload/v1740599833/volunteer_c02sm5.jpg" alt="Program 3" className="mb-4 rounded-lg" />
            <h2 className="text-2xl font-semibold text-blue-500 mb-2">Volunteer Opportunities</h2>
            <p className="text-gray-700">
              Our programs rely on dedicated volunteers who help with food collection, distribution, and outreach activities.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Programs;
