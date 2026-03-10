import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginSchema } from "../schemas/loginSchema"
import { useAuth } from "../hooks/useAuth"
import { useNavigate } from "react-router-dom"

const LoginPage = () => {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [loginFailed, setLoginFailed] = useState(false)

  const { register, handleSubmit } = useForm({
    resolver: zodResolver(loginSchema)
  })

  const onSubmit = async (data) => {
    const success = await login(data.username, data.password)
    if(success) navigate("/hotels")
    else setLoginFailed(result.error)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("username")} placeholder="Username" />
      <input {...register("password")} type="password" placeholder="Password" />
      {loginFailed && <p style={{color: "red"}}>wrong username or password! ❌</p>}
      <button type="submit">Login</button>
      <p onClick={() => navigate("/register")}>
        Account Not Found? Register Now!
      </p>
    </form>
  )
}
export default LoginPage