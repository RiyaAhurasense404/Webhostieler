import { useNavigate } from "react-router-dom"

const HomePage = () => {
  const navigate = useNavigate()
  
  return (
    <div>
      <p>Find your dream hotel!</p>
      <button onClick={() => navigate("/hotels")}>
        Search for Hotels→
      </button>
    </div>
  )
}
export default HomePage