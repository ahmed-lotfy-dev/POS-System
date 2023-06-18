import { Link, Outlet, useNavigate } from "react-router-dom"
import { removeFromLocalStorage } from "../lib/localStorage"
import { setUser } from "../store/features/user/userSlice"
import ProtectedRoute from "./ProtectedRoute"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../store/store"

export default function Layout() {
  const user = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  return (
    <ProtectedRoute>
      <div className='w-full p-6'>
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
                      removeFromLocalStorage("access_token")
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
        <Outlet />
      </div>
    </ProtectedRoute>
  )
}
