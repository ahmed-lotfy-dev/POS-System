import * as React from "react"

import { Link } from "react-router-dom"
import { Input } from "../components/ui/input"
import { Button } from "./ui/button"

import { useNavigate } from "react-router-dom"
import { User, setUser } from "../store/features/user/userSlice"
import jwt_decode from "jwt-decode"
import { useDispatch } from "react-redux"

export default function SignUp() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const email = data.get("email") as string
    const password = data.get("password") as string
    const confirmPassword = data.get("confirmPassword") as string

    try {
      if (password !== confirmPassword) return
      const res = await fetch("http://localhost:3001/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })
      const resData = await res.json()
      const token = resData.access_token
      const user = jwt_decode(token)
      localStorage.setItem("user", resData.access_token)
      dispatch(setUser(user as User))
      navigate("/home")
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
          <Input
            className='my-6'
            type='password'
            name='confirmPassword'
            placeholder='Confirm Password'
          ></Input>
          <div className='w-full'>
            <Button className='w-2/3 mt-2 mb-3 m-auto block'>Sign Up</Button>
          </div>
          <div className='mt-5'>
            <Link to='/signin'>Already have an acount? Sign Up</Link>
          </div>
        </form>
      </div>
    </div>
  )
}
