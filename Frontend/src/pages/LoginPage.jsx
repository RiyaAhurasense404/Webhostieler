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
  
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema)
  })
  console.log(errors)


  const onSubmit = (data) => {
    console.log("submit successful", data)
    const success = login(data.username, data.password)
    if(success) navigate("/hotels")
      else{
        setLoginFailed(true)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("username")} placeholder="Enter: @@@@" />
      <input {...register("password")} type="password" placeholder="Enter: 12345" />
      {loginFailed && <p style={{color: "red"}}>Galat username ya password! ❌</p>}
      <button type="submit">Login</button>
    </form>
  )
}
export default LoginPage