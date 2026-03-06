import { useMutation } from "@tanstack/react-query"
import { bookHotel } from "../api/hotelsApi"

export const useBookingMutation = () => {
    return useMutation({
        mutationFn: (bookingData) => bookHotel(bookingData)
    })
}