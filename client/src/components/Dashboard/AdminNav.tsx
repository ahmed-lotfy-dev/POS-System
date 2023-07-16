import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { RootState } from "../../store/store"
import { setUser } from "../../store/features/user/userSlice"
import {
  TbCategory2,
  TbBrandGoogleHome,
  TbLayoutDashboard,
  TbLogout,
} from "react-icons/tb"
import { BsBoxSeam } from "react-icons/bs"
import { GiWeight } from "react-icons/gi"

function DashboardNav() {
  const user = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  return (
    <div className='navbar max-w-[200px] h-full items-start flex-none'>
      <div className='flex flex-col'>
        <Link
          to={"/"}
          className='btn btn-neutral text-slate-300 text-3xl mr-auto ml-6 font-extrabold uppercase'
        >
          <h1>POS</h1>
        </Link>

        <nav className='menu rounded-box self-start mt-12'>
          <ul className='menu space-y-5'>
            <li>
              <Link className='font-semibold flex items-center' to='/'>
                <TbBrandGoogleHome size={25} />
                <span className='ml-3 text-xl font-bold'>Home</span>
              </Link>
            </li>
            <li>
              <Link className='font-semibold flex items-center' to='/dashboard'>
                <TbLayoutDashboard size={25} />
                <span className='ml-3 text-xl font-bold'>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                className='font-semibold flex items-center'
                to='/dashboard/categories'
              >
                <TbCategory2 size={25} />
                <span className='ml-3 text-xl font-bold'>Categories</span>
              </Link>
            </li>
            <li>
              <Link
                className='font-semibold flex items-center'
                to='/dashboard/products'
              >
                <BsBoxSeam size={25} />
                <span className='ml-3 text-xl font-bold'>Products</span>
              </Link>
            </li>
            <li>
              <Link
                className='font-semibold flex items-center'
                to='/dashboard/units'
              >
                <GiWeight size={25} />
                <span className='ml-3 text-xl font-bold'>Units</span>
              </Link>
            </li>
            {user.user ? (
              <li>
                <button
                  className='font-semibold flex items-center'
                  onClick={() => {
                    localStorage.removeItem("user")
                    dispatch(setUser(null))
                    navigate("/")
                  }}
                >
                  <TbLogout size={25} />
                  <span className='ml-3 text-xl font-bold'>LogOut</span>
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
