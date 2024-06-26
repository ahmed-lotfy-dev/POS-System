import { useEffect } from "react"
import { Navigate, Outlet, useNavigate } from "react-router-dom"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../store/store"
import { User, setUser } from "../store/features/user/userSlice"
import { jwtDecode } from "jwt-decode"

const ProtectedRoute = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const token = localStorage.getItem("user")

  useEffect(() => {
    if (token) {
      const parsedToken = JSON.parse(token!)
      const user = jwtDecode(parsedToken)
      dispatch(setUser(user as User))
    } else {
      navigate("/signin")
    }
  }, [token])

  const user = useSelector((state: RootState) => state.user)
  const path = useParams().toString()
  if (!user) {
    return <Navigate to="/signin" replace />
  }
  if (path === "/dashboard" && !user.user!.isAdmin) {
    return <Navigate to="/signin" replace />
  }
  return (
    <div className="h-screen">
      <Outlet />
    </div>
  )
}

export { ProtectedRoute }
