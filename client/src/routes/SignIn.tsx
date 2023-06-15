import * as React from "react"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import FormControlLabel from "@mui/material/FormControlLabel"
import Checkbox from "@mui/material/Checkbox"
import Link from "@mui/material/Link"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"

import toast, { Toaster } from "react-hot-toast"

import bcrypt from "bcryptjs"

const signIn = async (data: FormData) => {
  try {
    const email = data.get("email") as string
    const password = data.get("password") as string

    const res = await fetch("http://localhost:3001/users")
    const resData = await res.json()
    console.log(resData)
    const user = await resData.find(
      (user: { email: string }) => user.email === email
    )
    const decryptedPw = await bcrypt.compare(password, user.hashedPw)

    if (!user) {
      toast.error("User Not Found")
      throw new Error("User Not Found ")
    }

    if (!decryptedPw) {
      toast.error("Email or Password is wrong")
      throw Error("User Not Found")
    }
    if (decryptedPw) toast.success("Successfully Signed In")
  } catch (error) {
    console.log(error)
  }
}

export default function SignIn() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    signIn(data)
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    })
  }

  return (
    <Container component='main' maxWidth='xs'>
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component='h1' variant='h5'>
          Sign in
        </Typography>
        <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin='normal'
            required
            fullWidth
            id='email'
            label='Email Address'
            name='email'
            autoComplete='email'
            autoFocus
          />
          <TextField
            margin='normal'
            required
            fullWidth
            name='password'
            label='Password'
            type='password'
            id='password'
            autoComplete='current-password'
          />
          <FormControlLabel
            control={<Checkbox value='remember' color='primary' />}
            label='Remember me'
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href='#' variant='body2'>
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href='/signup' variant='body2'>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Toaster />
    </Container>
  )
}
