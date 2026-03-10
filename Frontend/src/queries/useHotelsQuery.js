import { useQuery } from "@tanstack/react-query"
import { fetchHotels } from "../api/hotelsApi"

export const useHotelsQuery = ({ city, max_price }) => {
  return useQuery({
    queryKey: ["hotels", city, max_price],
    queryFn: () => fetchHotels({ city, max_price }),
    staleTime: 0,
    retry: false
  })
}