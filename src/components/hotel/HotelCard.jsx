import { useNavigate } from "react-router-dom";
import { useWishList } from "../../hooks/useWishList";
import { formatCurrency } from "../../utils/formatCurrency";

const HotelCard = ({ hotel }) => {
  const navigate = useNavigate();
  const { wishlist, dispatch } = useWishList();
  const isWishlisted = wishlist.some((item) => item.id === hotel.id);

  return (
    <div onClick={() => navigate(`/hotels/${hotel.id}`)}>
      <img src={hotel.photoUrls[0]} alt={hotel.name} />
      <h3>{hotel.name}</h3>
      <p>{hotel.wishlistName}</p>
      <p>{hotel.reviewScore}</p>
      <p>{formatCurrency(hotel.priceBreakdown.grossPrice.value)}</p>
      <button
        onClick={(e) => {
          e.stopPropagation();
          dispatch({
            type: isWishlisted ? "Remove" : "Add",
            payload: hotel,
          });
        }}
      >
        {isWishlisted ? "Remove" : "Add"}
      </button>
    </div>
  );
};
export default HotelCard;
