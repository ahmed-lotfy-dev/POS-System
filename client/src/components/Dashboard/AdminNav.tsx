import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { RootState } from "../../store/store"
import { setUser } from "../../store/features/user/userSlice"

function DashboardNav() {
  const user = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  return (
    <div className='navbar max-w-[200px] h-full items-start flex-none'>
      <div className='flex flex-col'>
        <Link to={"/"}>
          <h1 className='text-3xl uppercase'>POS</h1>
        </Link>
        <nav className='self-start mt-12'>
          <ul className='space-y-5'>
            <li>
              <Link className='font-semibold' to='/'>
                Home
              </Link>
            </li>
            <li>
              <Link className='font-semibold' to='/dashboard'>
                Dashboard
              </Link>
            </li>
            <li>
              <Link className='font-semibold' to='/dashboard/categories'>
                Categories
              </Link>
            </li>
            <li>
              <Link className='font-semibold' to='/dashboard/products'>
                Products
              </Link>
            </li>
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
    </div>
  )
}

export default DashboardNav
