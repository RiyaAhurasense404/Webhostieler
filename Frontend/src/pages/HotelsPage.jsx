import { useHotelsQuery } from "../queries/useHotelsQuery"
import HotelList from "../components/hotel/HotelList"
import HotelFilters from "../components/hotel/HotelFilters"
import { useURLFilters } from "../hooks/useURLFilters"

const HotelsPage = () => {
  const { debouncedCity, debouncedPrice } = useURLFilters()

  const { data, isError, isLoading, error } = useHotelsQuery({
    city: debouncedCity,
    max_price: debouncedPrice
  })
  

  if(isLoading) return <p>Loading...</p>
  if(isError) return <p>{error?.message}</p>

  return (
    <div>
      <HotelFilters />
      <HotelList hotels={data?.data} />
    </div>
  )
}


export default HotelsPage