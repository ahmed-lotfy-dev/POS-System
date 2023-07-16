import { useSelector } from "react-redux"
import { RootState } from "../../store/store"
import Nav from "../Home/Nav"
import { Outlet } from "react-router-dom"

function DashboardLayout() {
  const user = useSelector((state: RootState) => state.user)

  return (
    <div className='w-full h-screen'>
      {!user.user?.isAdmin ? (
        <div
          className={`w-full h-full border-[3px] border-primary rounded-xl`}
        >
          {" "}
          <Nav />
          <div className='flex w-full justify-center items-center mt-10'>
            <h1 className='block'>You Don't Have Admin Privilliges</h1>
          </div>
        </div>
      ) : (
        <div
          className={`w-full h-full border-[3px] border-primary rounded-xl`}
        >
          {" "}
          <Nav />
          <div className='w-full shrink'>
            <Outlet />
          </div>
        </div>
      )}
    </div>
  )
}

export default DashboardLayout
