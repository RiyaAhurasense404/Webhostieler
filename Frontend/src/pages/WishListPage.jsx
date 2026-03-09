import { useWishList } from "../hooks/useWishList"
import HotelCard from "../components/hotel/HotelCard"

const WishListPage = () => {
  const { wishlist, dispatch } = useWishList()

  if(wishlist.length === 0) return <p>Wishlist Empty!</p>

  return (
    <div>
      <button onClick={() => dispatch({ type: "Clear" })}>
        Clear full wishlist 🗑️
      </button>
      {wishlist.map(hotel => (
        <div key={hotel.id}>
          <HotelCard hotel={hotel} />
          <button onClick={() => dispatch({ type: "Remove", payload: hotel })}>
            Remove ❌
          </button>
        </div>
      ))}
    </div>
  )
}
export default WishListPage