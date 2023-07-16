import { Outlet } from "react-router-dom"
import HomeNav from "../components/Home/HomeNav"

export default function Root() {
  return (
    
    <div className={`w-full h-full border-[3px] border-primary rounded-xl`}>
      <HomeNav />
      <Outlet />
    </div>
  )
}
