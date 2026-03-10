import { createContext, useState } from "react"
import { saveToStorage, getFromStorage, removeFromStorage } from "../utils/localStorage"
import axios from "axios"

export const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => getFromStorage("user") || null)

  const login = async (username, password) => {
    try {
      const response = await axios.post("http://localhost:8000/api/auth/login", {
        username,
        password
      })
      const { token, username: uname } = response.data
      const userData = { username: uname, token }
      setUser(userData)
      saveToStorage("user", userData)
      return true
    } catch (err) {
      return{
        success: false, 
      error: err.response?.data?.error || "Kuch gadbad ho gayi!" 
      }
    }
  }

  const logout = () => {
    setUser(null)
    removeFromStorage("user")
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}