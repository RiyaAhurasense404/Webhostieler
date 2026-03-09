import { useQuery } from "@tanstack/react-query"
import { fetchHotels } from "../api/hotelsApi"

export const useHotelsQuery = ({dest_id, dest_type, price_max}) => {
    return useQuery({
        queryKey: ["hotels", dest_id, dest_type, price_max],
        queryFn: () => fetchHotels({dest_id, dest_type, price_max}),
        retry:false
    })
}