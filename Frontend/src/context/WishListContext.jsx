import { createContext, useEffect, useReducer } from "react"
import wishlistReducer from "./wishlistReducer"
import { getFromStorage, saveToStorage } from "../utils/localStorage"

export const WishListContext = createContext(null)

export const WishListProvider = ({ children }) => {

  const [wishlist, dispatch] = useReducer(wishlistReducer, [], () => {
    const saved = getFromStorage("wishlist")
    return saved || []
  })

  useEffect(() =>{
    saveToStorage("wishlist", wishlist)
  },[wishlist])
  return (
    <WishListContext.Provider value={{ wishlist, dispatch }}>
      {children}
    </WishListContext.Provider>
  )
}