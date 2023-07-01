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
import { toggleTheme } from "../../store/features/theme/themeSlice"
import { useState } from "react"

function HomeNav() {
  const user = useSelector((state: RootState) => state.user)
  const theme = useSelector((state: RootState) => state.theme)
  const [isChecked, setIsChecked] = useState(false)

  const navigate = useNavigate()
  const dispatch = useDispatch()
  console.log(theme)

  const handleTheme = () => {
    dispatch(toggleTheme())
    setIsChecked(!isChecked)
  }

  return (
    <div
      className={`navbar w-full justify-between items-center ${
        isChecked ? "dark" : ""
      }`}
    >
      <Link
        to={"/"}
        className='btn btn-neutral text-slate-300 text-3xl mr-auto ml-6 font-extrabold uppercase'
      >
        <h1>POS</h1>
      </Link>

      <nav className='p-4'>
        <ul className='menu rounded-box flex flex-row gap-6'>
          <li>
            <Link className='font-semibold flex items-center' to='/'>
              <TbBrandGoogleHome size={25} />
              <span className='ml-1 text-lg font-bold'>Home</span>
            </Link>
          </li>
          {user.user?.isAdmin ? (
            <li>
              <Link className='font-semibold flex items-center' to='/dashboard'>
                <TbLayoutDashboard size={25} />
                <span className='ml-1 text-lg font-bold'>Dashboard</span>
              </Link>
            </li>
          ) : null}

          <li>
            <Link
              className='font-semibold flex items-center'
              to='/dashboard/categories'
            >
              <TbCategory2 size={25} />
              <span className='ml-1 text-lg font-bold'>Categories</span>
            </Link>
          </li>
          <li>
            <Link
              className='font-semibold flex items-center'
              to='/dashboard/products'
            >
              <BsBoxSeam size={25} />
              <span className='ml-1 text-lg font-bold'>Products</span>
            </Link>
          </li>
          <li>
            <Link
              className='font-semibold flex items-center'
              to='/dashboard/units'
            >
              <GiWeight size={25} />
              <span className='ml-1 text-lg font-bold'>Units</span>
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
                <span className='ml-1 text-lg font-bold'>LogOut</span>
              </button>
            </li>
          ) : null}
        </ul>
        <input
          type='checkbox'
          className='toggle toggle-md '
          checked={isChecked}
          onChange={handleTheme}
        />
      </nav>
    </div>
  )
}

export default HomeNav
