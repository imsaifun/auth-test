import cookie from "js-cookie"
import { signOut, useSession } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/router"
import { parseCookies } from "nookies"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { loadUser } from "../redux/userAction"
export default function ButtonAppBar() {
  const cookies = parseCookies()
  const router = useRouter()
  const [userState, setUserState] = useState("")
  const [isLoggedIn, setisLoggedIn] = useState(true)

  const { data: session } = useSession()
  const dispatch = useDispatch()

  const profile = useSelector((state) => state.profile)
  const { loading, error, dbUser } = profile

  const user = cookies?.user
    ? JSON.parse(cookies.user)
    : session?.user
      ? session?.user
      : ""

  // console.log(userState)
  useEffect(() => {
    session ? setUserState(session.user) : setUserState(user)

    if (user) {
      dispatch(loadUser(user.email, user))
    }
  }, [router, setUserState])
  useEffect(() => {
    if (user) {
      setisLoggedIn(true)
    }
    if (!user) {
      router.push("/src/user/login")
    }
  }, [isLoggedIn])

  const logoutHandler = async () => {
    if (session) {
      signOut()
    }
    cookie.remove("token")
    cookie.remove("user")
    setisLoggedIn(false)
    setUserState("")
  }

  return (
    <>
      <Link href="/" passHref>
        Logo
      </Link>
      <Link href="/src/user/profile" passHref>
        <h5>{userState && userState.name}</h5>
      </Link>

      <div>
        {userState ? (
          <>
            <button onClick={logoutHandler}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/src/user/login" passHref>
              <button>Login</button>
            </Link>
            <Link href="/src/user/register" passHref>
              <button>Register</button>
            </Link>
          </>
        )}
      </div>
    </>
  )
}
