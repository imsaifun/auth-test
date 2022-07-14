import axios from "axios"
import cookie from "js-cookie"
import { getSession, signIn, useSession } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/router"
import { parseCookies } from "nookies"
import * as React from "react"
import { useEffect, useState } from "react"
import { GoogleLoginButton } from "react-social-login-buttons"
import { toast } from "react-toastify"
import store from "../../../redux/store"
import { loadUser } from "../../../redux/userAction"



function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const cookies = parseCookies()

  const { data: session } = useSession()

  useEffect(() => {
    if (session) {
      toast.success("Login Success")
      router.push("/")
    }

    if (cookies?.user) {
      router.push("/")
    }
  }, [cookies?.user, router, session])

  const SubmitHandler = async (e) => {
    e.preventDefault()

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      }

      const { data } = await axios.post(
        `/api/user/login`,
        { email, password },
        config
      )

      toast.success(data.message)
      cookie.set("token", data?.token)
      cookie.set("user", JSON.stringify(data?.user))
      router.push("/")
    } catch (error) {
      toast.error(error.response.data.error)
    }
  }

  return (
    <>


      <form
        noValidate
        onSubmit={SubmitHandler}
      >
        <input
          required
          name="email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          required
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />


        <GoogleLoginButton onClick={() => signIn("google")} />





        <button
          type="submit"
        >
          Sign In
        </button>

        <Link href="/src/user/forget">
          Forgot password?
        </Link>
        <br />

        <Link href="/src/user/register">
          <a>
            Dont have an account? Sign Up
          </a>
        </Link>

      </form>



    </>
  )
}

// export async function getServerSideProps(context) {
//   const session = await getSession(context)

//   return {
//     props: {
//       session,
//     },
//   }
// }

export async function getServerSideProps(req) {
  const session = await getSession({ req })
  const cookies = parseCookies()

  const user = cookies?.user ? JSON.parse(cookies.user) : session?.user

  await store.dispatch(loadUser(user?.email, user))

  return {
    props: {
      session,
    },
  }
}


export default Login
