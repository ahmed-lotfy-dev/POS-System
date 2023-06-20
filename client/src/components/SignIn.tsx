import * as React from "react"
import { Link } from "react-router-dom"
import { Input } from "../components/ui/input"
import { Button } from "../components/ui/button"

import { useDispatch } from "react-redux"
import { User, setUser } from "../store/features/user/userSlice"
import jwt_decode from "jwt-decode"
import { useNavigate } from "react-router-dom"

export default function SignIn() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    try {
      const email = data.get("email") as string
      const password = data.get("password") as string

      const res = await fetch("http://localhost:3001/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })
      const resData = await res.json()
      if (!res.ok) {
        // toast({ title: resData.message })
      }
      const token = resData.access_token
      const user = jwt_decode(token)
      localStorage.setItem("user", JSON.stringify(user))
      dispatch(setUser(user as User))
      navigate("/")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='w-full h-full flex flex-col justify-center items-center mt-10'>
      <div className='w-full'>
        <h2 className='text-center text-3xl'>Sign In </h2>
      </div>
      <div>
        <form action='' onSubmit={handleSubmit}>
          <Input
            className='my-6'
            type='email'
            name='email'
            placeholder='Email...'
          ></Input>

          <Input
            className='my-6'
            type='password'
            name='password'
            placeholder='Password'
          ></Input>

          <div>
            <div className='w-full'>
              <Button className='w-2/3 mt-2 mb-3 m-auto block'>Sign In</Button>
            </div>
            <div className='mt-4'>
              <Link to='/signup'>Don't have an account? Sign Up</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
