import {useState} from "react"
import {useNavigate} from "react-router-dom"
import axios from "axios"
import { toast } from "react-toastify"

export default function Signup(){
    const [ username , setName] = useState("");
    const [ email , setEmail] = useState("");
    const [password , setPassword] = useState("");

    const navigate = useNavigate();

    const onSignUp = async (e)=>{
        try {
            e.preventDefault();
            await axios.post('http://localhost:4000/auth/signup',{
                username,
                password,
                email
            })
            toast.success("Account created successfully")
            navigate('/login')
        } catch (error) {
            console.log("Error occured during signup : ",error)
            toast.error("Try again later")
        }
    }
    return (
        <>
          <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-lg">
              <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
                Create an Account
              </h2>
    
              <form onSubmit={onSignUp} className="space-y-6">
               
                <div>
                  <label
                    htmlFor="name"
                    className="block text-gray-700 text-lg mb-2"
                  >
                    Full Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={username}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-4 bg-gray-100 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your full name"
                  />
                </div>
    
                <div>
                  <label
                    htmlFor="email"
                    className="block text-gray-700 text-lg mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-4 bg-gray-100 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your email"
                  />
                </div>
    
                <div>
                  <label
                    htmlFor="password"
                    className="block text-gray-700 text-lg mb-2"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-4 bg-gray-100 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your password"
                  />
                </div>
    
                <button
                  type="submit"
                  className="w-full py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition duration-300 transform hover:scale-105"
                >
                  Sign Up
                </button>
              </form>
    
              <p className="text-center text-gray-600 mt-4">
                Already have an account?{" "}
                <span
                  onClick={() => navigate("/login")}
                  className="text-blue-600 cursor-pointer hover:underline"
                >
                  Login
                </span>
              </p>
            </div>
          </div>
        </>
      );
}