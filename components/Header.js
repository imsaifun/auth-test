import cookie from "js-cookie"
import { signOut, useSession } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/router"
import { parseCookies } from "nookies"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { loadUser } from "../redux/action/userAction"
export default function ButtonAppBar() {
  const cookies = parseCookies()
  const router = useRouter()
  const [userState, setUserState] = useState("")
  // const [isLoggedIn, setisLoggedIn] = useState(true)

  const { data: session } = useSession()
  const dispatch = useDispatch()

  // const profile = useSelector((state) => state.profile)
  // const { loading, error, dbUser } = profile

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
  // useEffect(() => {
  //   if (user) {
  //     setisLoggedIn(true)
  //   }
  //   if (!user) {
  //     router.push("/user/login")
  //   }
  // }, [isLoggedIn])

  const logoutHandler = async () => {
    if (session) {
      signOut()
    }
    cookie.remove("token")
    cookie.remove("user")
    // setisLoggedIn(false)
    setUserState("")
    router.push("/user/login")
  }

  return (
    <>

      <Link href="/"passHref>
        <h3 >
          AuthApp
        </h3>
      </Link>
      <Link href="/user/profile" passHref>
        <a className="btn btn-primary">{userState && userState.name}</a>
      </Link>
      {/* <Link href="/user/author" passHref>
        <button className="btn btn-primary">Author</button>
      </Link> */}

      <div>
        {userState ? (
          <>
            <button className="btn btn-primary" onClick={logoutHandler}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/user/login"passHref>
              <a className="btn btn-primary">Login</a>
            </Link>
            <br />
            <Link href="/user/register"passHref>
              <a className="btn btn-primary">Register</a>
            </Link>
          </>
        )}
      </div>
    </>

  )
}
