import { useContext , createContext , useState , useEffect } from "react";
import axios from "axios"

export const AuthContext = createContext();

const AuthProvider = ({children})=>{
    const [ user , setUser ] = useState(null);

    useEffect(()=>{
        const token = localStorage.getItem('token');
        if(token){
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            setUser({token})
        }

    },[])

    const login = ()=>{
        localStorage.setItem('token',token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        setUser({token})
    }

    const logout = ()=>{
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
        setUser(null);
    }

    return(
        <AuthContext.Provider value = {{user,login,logout}}>
            {children}
        </AuthContext.Provider>
    )
    
}

export {AuthProvider};
