import { createContext, useState } from "react";

export const AuthContext = createContext(null);

const DUMMY_USER = {
    username: "@@@@",
    password: "12345"
}

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(()=>{
        const savedUser = localStorage.getItem("user");
        return savedUser ? JSON.parse(savedUser) : null;
    });

    

    const login = (username, password) => {
        if(username === DUMMY_USER.username && password === DUMMY_USER.password){
            setUser(DUMMY_USER);
            localStorage.setItem("user", JSON.stringify(DUMMY_USER))
            return true;
        }
        return false;
    }

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
    }

    return(
        <AuthContext.Provider value={{user, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}





