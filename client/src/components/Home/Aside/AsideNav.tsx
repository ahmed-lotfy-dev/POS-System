import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { RootState } from "../../../store/store"
import { setUser } from "../../../store/features/user/userSlice"

import { TbLayoutDashboard, TbLogout } from "react-icons/tb"
import { AiFillHome } from "react-icons/ai"
import { BsBoxSeam } from "react-icons/bs"
import { GiWeight } from "react-icons/gi"
import { NavLi } from "../../Ui/Nav/NavLi"
import { useLocation } from "react-router-dom"

function AsideNav() {
  const user = useSelector((state: RootState) => state.user)
  const theme = useSelector((state: RootState) => state.theme.theme)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation().pathname
  const handleLogout = () => {
    localStorage.removeItem("user")
    dispatch(setUser(null))
    navigate("/")
  }
  console.log(user.user?.isAdmin)
  return (
    <nav className='rounded-box gap-6 bg-slate-100 dark:bg-gray-600 rounded-r-none rounded-l-xl flex flex-col justify-between'>
      <div className='p-5 text-5xl font-extrabold'>
        <h1>P</h1>
      </div>
      <ul className='flex flex-col justify-start items-start space-y-8 p-4 grow'>
        <NavLi linkTo='/' name='Home'>
          <AiFillHome size={25} color={`${theme ? "white" : "#cecece"}`} />
        </NavLi>

        {user.user?.isAdmin ? (
          <NavLi name='Dashboard' linkTo='/dashboard'>
            <TbLayoutDashboard
              size={25}
              color={`${theme ? "white" : "black"}`}
            />
          </NavLi>
        ) : null}
        {location.includes("dashboard") ? (
          <>
            <NavLi name='Catgories' linkTo='/dashboard/categories'>
              <BsBoxSeam size={25} color={`${theme ? "white" : "black"}`} />
            </NavLi>
            <NavLi name='Products' linkTo='/dashboard/products'>
              <BsBoxSeam size={25} color={`${theme ? "white" : "black"}`} />
            </NavLi>
            <NavLi linkTo='/dashboard/units' name='Units'>
              <GiWeight size={25} color={`${theme ? "white" : "black"}`} />
            </NavLi>
          </>
        ) : (
          ""
        )}
      </ul>
      <div className='px-4'>
        {user.user ? (
          <NavLi name='LogOut' onHandler={handleLogout}>
            <TbLogout size={25} color={`${theme ? "white" : "black"}`} />
          </NavLi>
        ) : null}
      </div>
    </nav>
  )
}

export { AsideNav }
