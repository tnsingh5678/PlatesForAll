import {useState} from "react"
import {useNavigate} from "react-router-dom"
import axios from "axios"
import { toast } from "react-toastify"
import { UserContext } from "../context/UserContext"
import { useContext } from "react"
export default function Login(){
    const [ email , setEmail] = useState("");
    const [password , setPassword] = useState("");
    const {setUser} = useContext(UserContext);

    const navigate = useNavigate();

    const onLogin = async (e)=>{
        try {
            e.preventDefault();
            const response = await axios.post('https://platesforall.onrender.com/auth/login',{
                password,
                email
            })
            const { token,user } = response.data;
            localStorage.setItem('token',token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
            toast.success("Login successful")
            navigate('/')
            setUser(user);
            
        } catch (error) {
            toast.error("Login failed. Try again later")
            console.log("Error occured during login ", error)
        }
    }
    return (
        <>
          <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-sm p-8 bg-white rounded-lg shadow-lg">
              <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
                Welcome Back!
              </h2>
    
              <form onSubmit={onLogin} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-gray-700 text-lg mb-2">
                    Email
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
                  <label htmlFor="password" className="block text-gray-700 text-lg mb-2">
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
                  className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300 transform hover:scale-105"
                >
                  Login
                </button>
              </form>
    
              <p className="text-center text-gray-600 mt-4">
                Don't have an account?{" "}
                <span
                  onClick={() => navigate("/signup")}
                  className="text-blue-600 cursor-pointer hover:underline"
                >
                  Sign up
                </span>
              </p>
            </div>
          </div>
        </>
      );
}