import { useURLFilters } from "../../hooks/useURLFilters"

const HotelFilters = () => {
  const { city, price, setFilters } = useURLFilters()

  return (
    <div>
      <input 
        value={city || ""} 
        onChange={(e) => setFilters({ city: e.target.value, price })}
        placeholder="City search..."
      />
      <input 
        value={price || ""} 
        onChange={(e) => setFilters({ city, price: e.target.value })}
        placeholder="Max price..."
      />
    </div>
  )
}
export default HotelFilters