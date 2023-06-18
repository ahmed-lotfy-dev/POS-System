import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { RootState } from "../../store/store"
import { removeFromLocalStorage } from "../../lib/localStorage"
import { setUser } from "../../store/features/user/userSlice"
type Props = {}

function DashboardNav({}: Props) {
  const user = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  return (
    <div className='flex justify-between items-center w-full'>
      <Link to={"/"}>
        <h1 className='text-3xl uppercase'>POS System</h1>
      </Link>
      <nav>
        <ul className='flex gap-6'>
          <li>
            <Link className='font-semibold' to='/dashboard'>
              Dashboard Home
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
  )
}

export default DashboardNav
