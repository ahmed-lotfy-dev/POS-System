import { Outlet } from "react-router-dom"
import HomeNav from "../components/Home/HomeNav"

export default function Root() {
  return (
    <div className='w-full h-full border-[1px] border-blue-100 rounded-xl p-2'>
      <HomeNav />
      <Outlet />
    </div>
  )
}
