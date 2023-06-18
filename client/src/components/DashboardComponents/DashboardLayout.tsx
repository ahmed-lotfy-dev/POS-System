import { useSelector } from "react-redux"
import { RootState } from "../../store/store"
import ProtectedRoute from "../ProtectedRoute"
import DashboardNav from "./DashboardNav"
import { Outlet } from "react-router-dom"
type Props = {}

function DashboardLayout({}: Props) {
  const user = useSelector((state: RootState) => state.user)
  console.log(user.user?.isAdmin)
  return (
    <ProtectedRoute>
      <div className='w-full h-screen p-6'>
        {!user.user?.isAdmin ? (
          <div className=''>
            <DashboardNav />
            <div className='flex w-full h-full justify-center items-center mt-10'>
              <h1 className='block'>You Don't Have Admin Privilliges</h1>
            </div>
          </div>
        ) : (
          <div className=''>
            <DashboardNav />
            <div className='flex w-full h-full justify-center items-center mt-10'>
              <Outlet />
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  )
}

export default DashboardLayout
