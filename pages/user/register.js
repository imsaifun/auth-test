import Avatar from "@mui/material/Avatar"
import Button from "@mui/material/Button"
import CssBaseline from "@mui/material/CssBaseline"
import TextField from "@mui/material/TextField"
import * as React from "react"

import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import Box from "@mui/material/Box"
import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid"
import Link from "@mui/material/Link"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import Typography from "@mui/material/Typography"
import axios from "axios"
import { getSession, signIn, useSession } from "next-auth/react"
import { useState } from "react"
import { toast } from "react-toastify"

import { useRouter } from "next/router"
import { parseCookies } from "nookies"
import { GoogleLoginButton } from "react-social-login-buttons"

const theme = createTheme()

function Register() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [conPassword, setConPassword] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const router = useRouter()

  const { data: session } = useSession()

  const cookies = parseCookies

  // useEffect(() => {
  //   if (session) {
  //     toast.success("Login Success")
  //     router.push("/")
  //   }

  //   if (cookies?.user) {
  //     router.push("/")
  //   }
  // }, [router])

  const SubmitHandler = async (e) => {
    e.preventDefault()

    try {
      if (password !== conPassword) {
        toast.error("passwords do not match!")
        // console.log("passwords do not match")
        return
      }

      const user = cookies?.user
        ? JSON.parse(cookies.user)
        : session?.user
        ? session?.user
        : ""

      console.log(email, password, firstName, lastName)

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      }

      const { data } = await axios.post(
        `/api/user/register`,
        { email, password, firstName, lastName },
        config
      )

      toast.success(data?.message)
    } catch (error) {
      console.log(error.response)
      toast.error(error.response.data.error)
    }
  }

  return (
    <>
          <h1>
            Sign up
          </h1>
          <form
            onSubmit={SubmitHandler}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="confirm password"
                  label="Confirm Password"
                  type="password"
                  id="confirm password"
                  autoComplete="current-password"
                  value={conPassword}
                  onChange={(e) => setConPassword(e.target.value)}
                />
              </Grid>
            </Grid>
            <Grid
              container
              sx={{
                mt: 2,
                mb: 2,
                border: 1,
                borderRadius: 1,
                borderColor: "grey.400",
              }}
            >
              <GoogleLoginButton onClick={() => signIn("google")} />
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2, mb: 2, backgroundColor: "secondary.main" }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
          </>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context)

  return {
    props: {
      session,
    },
  }
}
export default Register
