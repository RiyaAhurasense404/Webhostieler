import { useLocation } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { bookingSchema } from "../schemas/bookingSchema"
import { useBookingMutation } from "../queries/useBookingMutation"

const BookingPage = () => {
  const location = useLocation()
  const { hotel_id, blockIds } = location.state
  const { mutate } = useBookingMutation()

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(bookingSchema)
  })

  const onSubmit = (data) => {
    mutate({
      hotel_id,
      blockIds,
      checkin_date: data.checkin_date,
      checkout_date: data.checkout_date
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("name")} placeholder="Name" />
      <input {...register("phone")} placeholder="Phone" />
      <input {...register("address")} placeholder="Address" />
      <input {...register("checkin_date")} placeholder="YYYY-MM-DD" />
      <input {...register("checkout_date")} placeholder="YYYY-MM-DD" />
      <button type="submit">Book Now ✅</button>
    </form>
  )
}
export default BookingPage