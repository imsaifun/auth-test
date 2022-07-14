import * as React from "react"

import { getSession } from "next-auth/react"

import { parseCookies } from "nookies"
import { useSelector } from "react-redux"
import store, { wrapper } from "../../../redux/store"
import { loadUser } from "../../../redux/userAction"

import axios from "axios"

const Profile = () => {
  const profile = useSelector((state) => state.profile)
  const { loading, error, dbUser } = profile

  console.log("profile", dbUser)

  const emailReset = async () => {
    console.log("submit")
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    }
    try {
      const { data } = await axios.post(
        `/api/user/emailReset`,
        { dbUser },
        config
      )
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <h1>Profile </h1>

      {dbUser && (
        <>
          <h1>
            {dbUser.name}
          </h1>
          <h1>
            {dbUser.email}
          </h1>
          <h1>
            {dbUser.validEmail}{" "}
            {dbUser.validEmail === "not" && (
              <button onClick={emailReset}>Send Token</button>
            )}
          </h1>
        </>
      )}
    </div>
  )
}

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

export default Profile
