import {  Outlet } from "react-router-dom"
import ProtectedRoute from "./ProtectedRoute"
import HomeNav from "./HomeNav"

export default function Layout() {

  return (
    <ProtectedRoute>
      <div className='w-full p-6'>
        <HomeNav />
        <Outlet />
      </div>
    </ProtectedRoute>
  )
}
