import { useDispatch, useSelector } from "react-redux"
import { NavLink, useNavigate } from "react-router-dom"
import { RootState } from "../../store/store"
import { setUser } from "../../store/features/user/userSlice"
import ThemeToggle from "../Ui/ThemeToggle"

function HomeNav() {
  const user = useSelector((state: RootState) => state.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  return (
    <div className='flex justify-between w-full'>
      <NavLink to={"/"} className='text-3xl uppercase p-4'>
        <h1>POS</h1>
      </NavLink>
      <nav className='w-full justify-between items-center'>
        <ul className='menu rounded-box flex flex-row bg-slate-100 gap-6'>
          <NavLink className='font-semibold' to='/'>
            Home
          </NavLink>
          <NavLink className='font-semibold' to='/products'>
            Products
          </NavLink>
          <NavLink className='font-semibold' to='/categories'>
            Categories
          </NavLink>
          <NavLink className='font-semibold' to='/categories'>
            Units
          </NavLink>
          {user.user?.isAdmin ? (
            <NavLink className='font-semibold' to='/dashboard'>
              Dashboard
            </NavLink>
          ) : null}
          {user.user ? (
            <button
              className='font-semibold'
              onClick={() => {
                localStorage.removeItem("user")
                dispatch(setUser(null))
                navigate("/")
              }}
            >
              LogOut
            </button>
          ) : null}
        </ul>
      </nav>
      <ThemeToggle />
    </div>
  )
}

export default HomeNav
