import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { RootState } from "../../../store/store"
import { setUser } from "../../../store/features/user/userSlice"
import ThemeToggle from "../../Home/ThemeToggle/ThemeToggle"

import { TbBrandGoogleHome, TbLayoutDashboard, TbLogout } from "react-icons/tb"
import { NavLi } from "../Nav/NavLi"

function HomeNav() {
  const user = useSelector((state: RootState) => state.user)
  const theme = useSelector((state: RootState) => state.theme.theme)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogout = () => {
    localStorage.removeItem("user")
    dispatch(setUser(null))
    navigate("/")
  }

  return (
    <div className='flex justify-between items-center w-full bg-slate-100 dark:bg-gray-600 rounded-t-lg px-10 py-2'>
      <nav className='w-full justify-between items-center'>
        <ul className='menu rounded-box flex flex-row gap-6 justify-end'>
          <NavLi name='Home' linkTo={"/"}>
            <TbBrandGoogleHome
              size={25}
              color={`${theme ? "white" : "black"}`}
            />
          </NavLi>
          {user.user?.isAdmin ? (
            <NavLi name='Dashboard' linkTo='/dashboard'>
              <TbLayoutDashboard
                size={25}
                color={`${theme ? "white" : "black"}`}
              />
            </NavLi>
          ) : null}
          {user.user ? (
            <NavLi name='LogOut' onHandler={handleLogout}>
              <TbLogout size={25} color={`${theme ? "white" : "black"}`} />
            </NavLi>
          ) : null}
        </ul>
      </nav>
      <ThemeToggle />
    </div>
  )
}

export { HomeNav }
