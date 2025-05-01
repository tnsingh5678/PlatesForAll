import React from "react";

const donationCategories = [
  {
    title: "Donate to Orphans",
    description: "Provide food and nutrition to orphaned children in need.",
    image: "https://files.globalgiving.org/pfil/32636/pict_large.jpg?m=1521722162000",
  },
  {
    title: "Donate to Malnourished People",
    description: "Help those suffering from malnutrition get healthy meals.",
    image: "https://media-cldnry.s-nbcnews.com/image/upload/t_fit-760w,f_auto,q_auto:best/ap/africa%20child%20hunger%20kenya-1483252933_v2.jpg",
  },
  {
    title: "Donate to Physically Disabled",
    description: "Support physically disabled individuals with nutritious food.",
    image: "https://guideposts.org/wp-content/uploads/2019/10/benrose4_marquee_0-1024x576.jpg.optimal.jpg",
  },
  {
    title: "Donate to Homeless Shelters",
    description: "Ensure that homeless individuals receive warm meals daily.",
    image: "https://img.freepik.com/premium-photo/food-donations-needy-homeless_482257-75414.jpg",
  },
  {
    title: "Donate to Elderly Homes",
    description: "Provide healthy food to elderly people in care homes.",
    image: "https://files.globalgiving.org/pfil/31496/pict_featured_large.jpg?t=1514915876000",
  },
  {
    title: "Donate to Disaster Victims",
    description: "Help victims of natural disasters by providing emergency food.",
    image: "https://cimages.milaap.org/milaap/image/upload/c_limit,w_1170/v1656141552/production/images/uploader_images/help-the-poor__2__1656141550.jpg",
  },
];

const GetInvolved = () => {
  return (
    <section className="bg-green-50 py-12 px-6 md:px-12">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-green-700 text-center mb-8">
          Donate <span className="text-green-500">Food</span>
        </h1>

        {/* Donation Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {donationCategories.map((donation, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg overflow-hidden p-4 flex flex-col items-center text-center hover:shadow-xl transition duration-300"
            >
              <img
                src={donation.image}
                alt={donation.title}
                className="w-full h-48 object-cover mb-4 rounded"
              />
              <h3 className="text-xl font-semibold text-green-700 mb-2">
                {donation.title}
              </h3>
              <p className="text-gray-700 mb-4">{donation.description}</p>
              
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GetInvolved;