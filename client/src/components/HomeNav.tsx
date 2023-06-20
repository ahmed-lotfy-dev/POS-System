import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { RootState } from "../store/store"
import { setUser } from "../store/features/user/userSlice"

function HomeNav() {
  const user = useSelector((state: RootState) => state.user)
  console.log(user)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  return (
    <div className='flex justify-between items-center w-full'>
      <Link to={"/"}>
        <h1 className='text-3xl uppercase'>POS System</h1>
      </Link>
      <nav>
        <ul className='flex gap-6'>
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
