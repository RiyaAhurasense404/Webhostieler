import { useHotelsQuery } from "../queries/useHotelsQuery"
import HotelList from "../components/hotel/HotelList"
import HotelFilters from "../components/hotel/HotelFilters"
import { useURLFilters } from "../hooks/useURLFilters"
import { useState, useEffect, useCallback } from "react"
import { fetchAutoComplete } from "../api/hotelsApi"

const HotelsPage = () => {
  const { debouncedCity, debouncedPrice } = useURLFilters();
  const [destId, setDestId] = useState("-2092174") ;

  const fetchDestId = useCallback(() => {
    if(debouncedCity) {
      fetchAutoComplete(debouncedCity).then(data => {
        if(data?.data?.[0]?.dest_id) {
          setDestId(data.data[0].dest_id)
        }
      })
    }
  }, [debouncedCity])
  
  useEffect(() => {
    fetchDestId()
  }, [fetchDestId])

  const { data,isError, isLoading,  error } = useHotelsQuery({
    dest_id: destId,
    dest_type: "city",
    price_max: debouncedPrice
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