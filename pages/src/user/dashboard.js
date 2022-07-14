import { getSession, useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { parseCookies } from "nookies"
import * as React from "react"
import { useEffect } from "react"



function Dashboard() {
  
  const router = useRouter()

  const cookies = parseCookies()

  const { data: session } = useSession()

  useEffect(() => {
    if (!session && !cookies?.user) {
      router.push("/src/user/login")
    }
  }, [cookies?.user, router, session])

  return (
    <>
      <h1>
        Dashboard
      </h1>
      <h3>This is secret page</h3>
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

export default Dashboard
