import { useContext } from "react";
import { WishListContext } from "../context/WishListContext";

export const useWishList = () => {
    return useContext(WishListContext);
}