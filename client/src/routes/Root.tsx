import { Outlet } from "react-router-dom"
import HomeNav from "../components/Home/Nav"
import { useSelector } from "react-redux"
import { RootState } from "../store/store"
import { useEffect } from "react"

export default function Root() {
  const theme = useSelector((state: RootState) => state.theme)

  useEffect(() => {
    document.querySelector("html")?.setAttribute("data-theme", theme.theme)
  }, [theme])

  return (
    <div
      className={`w-full h-full border-[3px] border-gray-500 rounded-xl ${
        theme ? "dark" : ""
      }`}
    >
      <HomeNav />
      <Outlet />
    </div>
  )
}
