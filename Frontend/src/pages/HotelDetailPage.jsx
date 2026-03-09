import { useParams } from "react-router-dom";
import { useDetailQuery } from "../queries/useDetailQuery";
import { useNavigate } from "react-router-dom"

const HotelDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate()
  
  const { data, isLoading, isError } = useDetailQuery({
    hotel_id: id,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error!</p>;

  const hotel = data?.data;

  return (
    <div>
      <h1>{hotel?.hotel_name}</h1>
      <p>{hotel?.address}</p>
      <p>{hotel?.city}</p>
      <button
        onClick={() =>
          navigate("/booking", {
            state: {
              hotel_id: hotel?.hotel_id,
              blockIds: hotel?.block[0]?.block_id,
            },
          })
        }
      >
        Book Now 📅
      </button>{" "}
    </div>
  );
};
export default HotelDetailPage;
