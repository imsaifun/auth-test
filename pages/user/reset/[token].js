import axios from "axios"
import { useRouter } from "next/router"
import * as React from "react"
import { toast } from "react-toastify"
// const theme = createTheme()

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
     
     
          <h1 component="h1" variant="h5">
            Reset Password
          </h1>
          <form
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <input
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <input
              margin="normal"
              required
              fullWidth
              id="conPassword"
              label="Confirm Password"
              name="conPassword"
              type="password"
              autoComplete="email"
              autoFocus
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
          </form>
    </>
  )
}
