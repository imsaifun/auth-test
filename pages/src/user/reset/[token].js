import * as React from "react"
import Avatar from "@mui/material/Avatar"
import Button from "@mui/material/Button"
import CssBaseline from "@mui/material/CssBaseline"
import TextField from "@mui/material/TextField"
import FormControlLabel from "@mui/material/FormControlLabel"
import Checkbox from "@mui/material/Checkbox"
import Link from "@mui/material/Link"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { useRouter } from "next/router"
import axios from "axios"
import { toast } from "react-toastify"
const theme = createTheme()

export default function SignIn() {
  const router = useRouter()

  const { token } = router.query

  console.log(token)

  const handleSubmit = async (event) => {
    event.preventDefault()
    const result = new FormData(event.currentTarget)
    // eslint-disable-next-line no-console

    try {
      const conPassword = result.get("conPassword")
      const password = result.get("password")

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      }

      const { data } = await axios.put(
        `/api/user/reset/${token}`,
        { conPassword, password },
        config
      )
      toast.success(data.message)
    } catch (error) {
      toast.error(error?.response?.data?.error)
    }
  }

  return (
    <>
    
          <form
            onSubmit={handleSubmit}
          >
            <input
              required
              name="password"
              type="password"
              id="password"
            />
            <input
              required
              id="conPassword"
              name="conPassword"
              type="password"
            />

            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <button
              type="submit"
            >
              Submit
            </button>
            {/* <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid> */}
          </form>
    </>
  )
}
