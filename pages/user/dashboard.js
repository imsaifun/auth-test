import Typography from "@mui/material/Typography"
import { getSession, useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { parseCookies } from "nookies"
import * as React from "react"
import { useEffect, useState } from "react"

// const theme = createTheme()

function Dashboard() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const cookies = parseCookies()

  const { data: session } = useSession()

  useEffect(() => {
    if (!session && !cookies?.user) {
      router.push("/user/login")
    }
  }, [router])

  return (
    <>
      <h1 component="h1" variant="h5">
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
