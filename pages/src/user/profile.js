import * as React from "react"

import { useSession, signIn, signOut, getSession } from "next-auth/react"

import { parseCookies } from "nookies"
import { GoogleLoginButton } from "react-social-login-buttons"
import { loadUser } from "../../../redux/userAction"
import { useDispatch, useSelector } from "react-redux"
import { wrapper } from "../../../redux/store"
import { Button, Typography } from "@mui/material"
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
          <h3>
            {dbUser.name}
          </h3>
          <h3>
            {dbUser.email}
          </h3>
          <h3>
            {dbUser.validEmail}{" "}
            {dbUser.validEmail === "not" && (
              <Button onClick={emailReset}>Send Token</Button>
            )}
          </h3>
        </>
      )}
    </div>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req }) => {
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
)

export default Profile
