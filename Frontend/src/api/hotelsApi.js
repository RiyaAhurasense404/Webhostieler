import axiosInstance from "./axiosInstance"

export const fetchHotels = async ({ city, max_price }) => {
  const params = {}
  
  if(city) params.city = city
  if(max_price) params.max_price = max_price

  const response = await axiosInstance.get("/hotels", { params })
  return response.data
}

export const fetchHotelDetail = async ({ hotel_id }) => {
  const response = await axiosInstance.get(`/hotels/${hotel_id}`)
  return response.data
}