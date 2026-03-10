import { useSearchParams } from "react-router-dom"
import { useDebounce } from "./useDebounce"

export const useURLFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const city = searchParams.get("city")
  const price = searchParams.get("max_price")

  const debouncedCity = useDebounce(city, 1000)
  const debouncedPrice = useDebounce(price, 1000)


  const setFilters = (filters) => {
    setSearchParams(filters)
  }

  return { city, price, setFilters , debouncedCity, debouncedPrice} 
}