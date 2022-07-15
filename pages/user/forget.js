import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/router"
import * as React from "react"
import { toast } from "react-toastify"

// const theme = createTheme()

export default function SignIn() {
  const router = useRouter()
  const handleSubmit = async (event) => {
    event.preventDefault()
    const result = new FormData(event.currentTarget)
    // eslint-disable-next-line no-console

    try {
      const email = result.get("email")

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      }

      const { data } = await axios.post(`/api/user/forget`, { email }, config)
      toast.success(data.message)
      router.push("/user/login")
    } catch (error) {
      toast.error(error?.response?.data?.error)
    }
  }

  return (
    <>
  
          <h1 component="h1" variant="h5">
            Email Reset Link
          </h1>
          <form
            onSubmit={handleSubmit}
          >

              <input
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <button
                type="submit"
              >
                Submit
              </button>
              <br />
                  <Link href="/user/login" passHref>
                    Have an account ? Login
                  </Link>
                  <br />
                  
                  <Link href="/user/register" passHref>
                    Dont have an account? Sign Up
                  </Link>
          </form>
    </>
  )
}
