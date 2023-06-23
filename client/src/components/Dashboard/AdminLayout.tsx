import { useSelector } from "react-redux"
import { RootState } from "../../store/store"
import DashboardNav from "./AdminNav"
import { Outlet } from "react-router-dom"

function DashboardLayout() {
  const user = useSelector((state: RootState) => state.user)
  return (
    <div className='w-full h-screen p-2'>
      {!user.user?.isAdmin ? (
        <div className='w-full'>
          <DashboardNav />
          <div className='flex w-full justify-center items-center mt-10'>
            <h1 className='block'>You Don't Have Admin Privilliges</h1>
          </div>
        </div>
      ) : (
        <div className='w-full h-full flex border-[1px] border-blue-100 rounded-xl pt-8 pl-3'>
          <DashboardNav />
          <div className='w-full shrink'>
            <Outlet />
          </div>
        </div>
      )}
    </div>
  )
}

export default DashboardLayout
