import { useNavigate } from "react-router-dom"
import { useWishList } from "../../hooks/useWishList"
import { formatCurrency } from "../../utils/formatCurrency"

const HotelCard = ({ hotel }) => {
  const navigate = useNavigate()
  const { dispatch } = useWishList()

  return (
    <div onClick={() => navigate(`/hotels/${hotel.id}`)}>
      <img src={hotel.photoUrls[0]} alt={hotel.name} />
      <h3>{hotel.name}</h3>
      <p>{hotel.wishlistName}</p>
      <p>{hotel.reviewScore}</p>
      <p>{formatCurrency(hotel.priceBreakdown.grossPrice.value)}</p>
      <button onClick={(e) => {
        e.stopPropagation()
        dispatch({ type: "Add", payload: hotel })
      }}>❤️</button>
    </div>
  )
}
export default HotelCard