import { useState, useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { LocationContext} from "../context/LocationContext"
import { toast } from "react-toastify";
import axios from "axios";

const Donation = () => {
  const [food, setFood] = useState("");
  const [category, setCategory] = useState([]);
  const [address, setAddress] = useState("");
  const [donorId, setDonorId] = useState("");

  const {coords} = useContext(LocationContext);

  const {user} = useContext(UserContext);

  useEffect(() => {
    setDonorId(user.userId);
  }, [user.userId]);

  const submitHandler = async (e) => {
    e.preventDefault(); 
    try {
      const response = await fetch(`http://localhost:4000/donation/donor/${donorId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          food,
          category,
          address,
          
        }),
      });
      

      const data = await response.json();
      console.log(data.donation._id);

      if (response.ok) {
        
        console.log("Donation submitted:", data);
        toast.success("You have succesfully donated food");
        const res = await axios.post('http://localhost:4000/donation/find',{
          latitude : coords[0].toString(),
          longitude : coords[1].toString(),
          DonationId : data.donation._id
        })
        console.log(res.data)
        // setFood("");
        // setAddress("");
        // setCategory();
      } else {

        toast.error("Error while donating food");
        console.error("Error submitting donation:", data.message || "Unknown error");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-teal-300 to-blue-500 flex justify-center items-center pt-20">
      <div className="bg-white p-12 rounded-3xl shadow-2xl w-full max-w-lg transition-transform transform hover:scale-105 duration-500 ease-out">
        <h2 className="text-4xl font-extrabold text-center text-indigo-700 mb-10 tracking-wide">
          Donate Food
        </h2>
        <form className="space-y-8" onSubmit={submitHandler}>
          {/* Donor ID */}
          <input type="hidden" value={donorId} className="hidden" />

          {/* Food Input */}
          <div>
            <label htmlFor="food" className="block text-lg font-medium text-gray-700 mb-2">
              Type of Food
            </label>
            <input
              id="food"
              type="text"
              value={food}
              onChange={(e) => setFood(e.target.value)}
              className="p-4 w-full border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 ease-in-out hover:ring-4 hover:ring-indigo-400 shadow-md"
              placeholder="Enter the type of food"
            />
          </div>

          {/* Category Dropdown */}
          <div>
            <label htmlFor="category" className="block text-lg font-medium text-gray-700 mb-2">
              Food Category
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory([...e.target.selectedOptions].map(option => option.value))}
              multiple
              className="p-4 w-full border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 ease-in-out hover:ring-4 hover:ring-indigo-400 shadow-md"
            >
              <option value="Vegetables">Vegetables</option>
              <option value="Fruits">Fruits</option>
              <option value="Grains">Grains</option>
              <option value="Protein">Protein</option>
              <option value="Dairy">Dairy</option>
            </select>
          </div>

          {/* Address Input */}
          <div>
            <label htmlFor="address" className="block text-lg font-medium text-gray-700 mb-2">
              Delivery Address
            </label>
            <textarea
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="p-4 w-full border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 ease-in-out hover:ring-4 hover:ring-indigo-400 shadow-md"
              placeholder="Enter your delivery address"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="py-3 px-10 bg-indigo-600 text-white font-semibold rounded-full shadow-2xl transform hover:scale-105 hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-500 transition-all duration-300 ease-out hover:shadow-xl"
            >
              Submit Donation
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Donation;
