import { Link, Outlet } from "react-router-dom"

export default function Layout() {
  return (
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
            <li>
              <Link className='font-semibold' to='/signin'>
                Sign In
              </Link>
            </li>
            <li>
              <Link className='font-semibold' to='/signup'>
                Sign Up
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <Outlet />
    </div>
  )
}
