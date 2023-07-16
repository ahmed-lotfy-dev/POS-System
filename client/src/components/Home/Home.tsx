import { useRouteLoaderData } from "react-router-dom"
import { RootState } from "../../../src/store/store"
import { useSelector } from "react-redux"

export default function Home() {
  const data = useRouteLoaderData("root")
  console.log(data)
  const user = useSelector((state: RootState) => state.user)
  
  return (
    <div className='w-full flex flex-col justify-center items-center mt-10'>
      <h1 className='text-3xl font-boldest underline '>Home</h1>
      <h2 className='text-2xl font-semibold mt-10'>
        welcome {user.user?.username}
      </h2>
    </div>
  )
}
