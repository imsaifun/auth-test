
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { parseCookies } from "nookies"
import { useEffect } from "react"

const Wrapper = ({ children }) => {
  const cookies = parseCookies()
  const router = useRouter()
  const { data: session } = useSession()

  const user = cookies?.user
    ? JSON.parse(cookies.user)
    : session?.user
    ? session?.user
    : ""

  useEffect(() => {
    if (!user) {
      router.push("/user/login")
// router.replace('/user/login');
    }
  }, [user, router])

  return (
    <>
      <h1>{children}</h1>
    </>
  )
}

export default Wrapper
