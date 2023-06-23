import { ReactNode, useEffect } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../store/store"
import { User, setUser } from "../store/features/user/userSlice"

interface ProtectedRouteProps {
  children: ReactNode
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const token = localStorage.getItem("user")

  const user = useSelector((state: RootState) => state.user)

  useEffect(() => {
    if (!token) navigate("/signin")
    else {
      const user = JSON.parse(token)
      dispatch(setUser(user as User))
    }
  }, [dispatch, navigate, token])

  const path = useParams().toString()
  if (!user) {
    return <Navigate to='/signin' replace />
  }
  if (path === "/dashboard" && !user.user!.isAdmin) {
    return <Navigate to='/signin' replace />
  }

  return <div className='h-full p-2'>{children}</div>
}
