import { createContext, useState } from "react";
import { saveToStorage, getFromStorage, removeFromStorage } from "../utils/localStorage"


export const AuthContext = createContext(null);

const DUMMY_USER = {
    username: "@@@@",
    password: "12345"
}

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(()=>{
        const savedUser = getFromStorage("user")
        return savedUser || null;
    });

    

    const login = (username, password) => {
        if(username === DUMMY_USER.username && password === DUMMY_USER.password){
            setUser(DUMMY_USER);
            saveToStorage("user", DUMMY_USER)
            return true;
        }
        return false;
    }

    const logout = () => {
        setUser(null);
        removeFromStorage("user")
    }

    return(
        <AuthContext.Provider value={{user, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}





