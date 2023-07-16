import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { RootState } from "../../store/store"
import { setUser } from "../../store/features/user/userSlice"
import { Button, Navbar, Typography } from "@material-tailwind/react"

import {
  TbCategory2,
  TbBrandGoogleHome,
  TbLayoutDashboard,
  TbLogout,
} from "react-icons/tb"
import { BsBoxSeam } from "react-icons/bs"
import { GiWeight } from "react-icons/gi"
import { useState } from "react"

function HomeNav() {
  const user = useSelector((state: RootState) => state.user)
  const [darkMode, setDarkMode] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleTheme = () => {
    const isDarkMode = !darkMode
    setDarkMode(isDarkMode)
  }

  return (
    <div className={`w-full justify-between items-center `}>
      <Navbar className="rounded-box flex justify-between items-center gap-6'">
        <ul className='flex justify-center items-center h-full'>
          <Typography className='rounded text-slate-300 text-3xl mr-auto ml-6 font-extrabold uppercase'>
            <Link to={"/"}>
              <h1>POS</h1>
            </Link>
          </Typography>
          <Typography
            as='li'
            variant='small'
            color='blue-gray'
            className='p-1 font-normal'
          >
            <Link className='font-semibold flex items-center' to='/'>
              <TbBrandGoogleHome size={25} />
              <span className='ml-1 text-lg font-bold'>Home</span>
            </Link>
          </Typography>
          {user.user?.isAdmin ? (
            <Typography
              as='li'
              variant='small'
              color='blue-gray'
              className='p-1 font-normal'
            >
              <Link className='font-semibold flex items-center' to='/dashboard'>
                <TbLayoutDashboard size={25} />
                <span className='ml-1 text-lg font-bold'>Dashboard</span>
              </Link>
            </Typography>
          ) : null}
          <Typography
            as='li'
            variant='small'
            color='blue-gray'
            className='p-1 font-normal'
          >
            <Link
              className='font-semibold flex items-center'
              to='/dashboard/categories'
            >
              <TbCategory2 size={25} />
              <span className='ml-1 text-lg font-bold'>Categories</span>
            </Link>
          </Typography>
          <Typography
            as='li'
            variant='small'
            color='blue-gray'
            className='p-1 font-normal'
          >
            <Link
              className='font-semibold flex items-center'
              to='/dashboard/products'
            >
              <BsBoxSeam size={25} />
              <span className='ml-1 text-lg font-bold'>Products</span>
            </Link>
          </Typography>
          <Typography
            as='li'
            variant='small'
            color='blue-gray'
            className='p-1 font-normal'
          >
            <Link
              className='font-semibold flex items-center'
              to='/dashboard/units'
            >
              <GiWeight size={25} />
              <span className='ml-1 text-lg font-bold'>Units</span>
            </Link>
          </Typography>
          {user.user ? (
            <Typography
              as='li'
              variant='small'
              color='blue-gray'
              className='p-1 font-normal'
            >
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
            </Typography>
          ) : null}
        </ul>
      </Navbar>
    </div>
  )
}

export default HomeNav
