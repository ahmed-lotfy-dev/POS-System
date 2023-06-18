import * as React from "react"
import { Link } from "react-router-dom"
  import { Input } from "../components/ui/input"
import { Button } from "../components/ui/button"

import { addToLocalStorage } from "../lib/localStorage"
import { useDispatch } from "react-redux"
import { User, setUser } from "../store/features/user/userSlice"
import jwt_decode from "jwt-decode"
import { useNavigate } from "react-router-dom"
import { useToast } from "../components/ui/use-toast"

export default function SignIn() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { toast } = useToast()

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
        toast({ title: resData.message })
      }
      console.log(resData)
      const token = resData.access_token
      const user = jwt_decode(token)
      addToLocalStorage("access_token", resData.access_token)
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
            <Link to='/signin'></Link>
            <Link to='/signup'>Don't have an account? Sign Up</Link>
          </div>
          <Button>Submit</Button>
        </form>
      </div>
    </div>
  )
}
