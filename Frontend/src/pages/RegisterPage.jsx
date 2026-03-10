import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { registerSchema } from "../schemas/registerSchema"
import { useNavigate } from "react-router-dom"
import axios from "axios"

const RegisterPage = () => {
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(registerSchema)
  })

  const onSubmit = async (data) => {
    try {
      await axios.post("http://localhost:8000/api/auth/register", {
        username: data.username,
        password: data.password
      })
      alert("Register successful! ✅")
      navigate("/login")
    } catch (err) {
      alert("Register failed! ❌")
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("username")} placeholder="Username" />
      {errors.username && <p>{errors.username.message}</p>}
      
      <input {...register("password")} type="password" placeholder="Password" />
      {errors.password && <p>{errors.password.message}</p>}
      
      <input {...register("confirmPassword")} type="password" placeholder="Confirm Password" />
      {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
      
      <button type="submit">Register</button>
    </form>
  )
}
export default RegisterPage