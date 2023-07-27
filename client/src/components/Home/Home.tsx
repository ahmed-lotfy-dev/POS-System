import { useRouteLoaderData } from "react-router-dom"
import { RootState } from "../../store/store"
import { useSelector } from "react-redux"

import { Search } from "./Search/Search"
import { Categories } from "./Categories/Categories"

const Home = () => {
  const data = useRouteLoaderData("root")
  console.log(data)
  const user = useSelector((state: RootState) => state.user)

  return (
    <div className='w-full flex flex-col justify-center items-center mt-10'>
      <Search />
      <Categories />
      <h1 className='text-3xl font-boldest underline '>Home</h1>
      <h2 className='text-2xl font-semibold mt-10'>
        welcome {user.user?.username}
      </h2>
    </div>
  )
}

export { Home }
