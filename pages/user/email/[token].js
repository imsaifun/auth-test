import axios from "axios"
import { useRouter } from "next/router"
import * as React from "react"
import { useEffect } from "react"
import { toast } from "react-toastify"
// const theme = createTheme()

export default function EmailConfirm() {
  const router = useRouter()

  const { token } = router.query

  console.log(token)

  useEffect(() => {
    sendToken(token)
  }, [token])

  const sendToken = async (token) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      }

      const { data } = await axios.put(`/api/user/email/${token}`, {}, config)
      toast.success(data.message)
    } catch (error) {
      toast.error(error?.response?.data?.error)
    }
  }

  return (
    <>
          <h1>
            Confirm Email
          </h1>
    </>
  )
}
