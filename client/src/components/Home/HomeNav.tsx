import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { RootState } from "../../store/store"
import { setUser } from "../../store/features/user/userSlice"

function HomeNav() {
  const user = useSelector((state: RootState) => state.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  return (
    <div className='navbar w-full justify-between items-center'>
      <Link to={"/"}>
        <h1 className='text-3xl uppercase p-4'>POS</h1>
      </Link>
      <nav className='p-4'>
        <ul className='menu rounded-box flex flex-row bg-slate-100 gap-6'>
          <li>
            <Link className='font-semibold' to='/'>
              Home
            </Link>
          </li>
          <li>
            <Link className='font-semibold' to='/categories'>
              Categories
            </Link>
          </li>
          <li>
            <Link className='font-semibold' to='/products'>
              Products
            </Link>
          </li>
          {user.user?.isAdmin ? (
            <li>
              <Link className='font-semibold' to='/dashboard'>
                Dashboard
              </Link>
            </li>
          ) : null}
          {user.user ? (
            <li>
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
            </li>
          ) : null}
        </ul>
      </nav>
    </div>
  )
}

export default HomeNav
