import HotelCard from "./HotelCard"

const HotelList = ({ hotels }) => {
  return (
    <div>
      {hotels.map(hotel => (
        <HotelCard key={hotel.id} hotel={hotel} />
      ))}
    </div>
  )
}
export default HotelList