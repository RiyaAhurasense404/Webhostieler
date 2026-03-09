import { useNavigate } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"

const Navbar = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  return (
    <div className='Nav'>
      <h1 onClick={() => navigate("/")}>🏨 Webhostieler</h1>
      {user && (
        <>
          <button onClick={() => navigate("/wishlist")}>❤️ Wishlist</button>
          <button onClick={() => {
            logout()
            navigate("/loginPage")
          }}>🚪 Logout</button>
        </>
      )}
    </div>
  )
}
export default Navbar