import { useNavigate } from "react-router-dom"

const NotFoundPage = () => {
  const navigate = useNavigate()
  
  return (
    <div>
      <h1>404 😵</h1>
      <p>Can't find the page!</p>
      <button onClick={() => navigate("/")}>
        Go to Home 🏠
      </button>
    </div>
  )
}
export default NotFoundPage