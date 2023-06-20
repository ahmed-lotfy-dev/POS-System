import { ReactNode } from "react"
import { Navigate } from "react-router-dom"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { RootState } from "../store/store"

interface ProtectedRouteProps {
  children: ReactNode
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const user = useSelector((state: RootState) => state.user)
  const path = useParams().toString()
  if (!user) {
    return <Navigate to='/signin' replace />
  }
  if (path === "/dashboard" && !user.user!.isAdmin) {
    return <Navigate to='/signin' replace />
  }

  return <div>{children}</div>
}

export default ProtectedRoute
