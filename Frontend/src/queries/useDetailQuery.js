import { useQuery } from "@tanstack/react-query";
import { fetchHotelDetail } from "../api/hotelsApi";

export const useDetailQuery = ({hotel_id, checkin_date, checkout_date}) => {
    return useQuery({
        queryKey:["hotelDetail", hotel_id, checkin_date, checkout_date],
        queryFn: () => fetchHotelDetail({hotel_id, checkin_date, checkout_date})
    })
}