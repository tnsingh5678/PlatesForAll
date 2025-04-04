import { useState , createContext , useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const UserContext = createContext();

const UserProvider = ({children})=>{
    const [ user ,setUser] = useState("");
    const Decode = (token)=>{
        try {
            const decoded = jwtDecode(token);
            return decoded;
        } catch (error) {
            console.log("Error while getting user");
            return "";
        }
    }

    const getUser = ()=>{
        const token = localStorage.getItem('token');
        if(token){
            setUser(Decode(token));
        }else{
            setUser("");
        }
    }

    useEffect(()=>{
        getUser();
    },[]);

    return(
        <>
        <UserContext.Provider value={{user,setUser}}>{children}</UserContext.Provider>
        </>
    )


}

export { UserContext , UserProvider};