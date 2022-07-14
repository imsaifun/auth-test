import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/router"
import * as React from "react"
import { toast } from "react-toastify"



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
            router.push("/login")
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
                noValidate
            >
                <input
                    required
                    name="email"
                />
                <button
                    type="submit"
                >
                    Submit
                </button>
                <Link href="/src/user/login" passHref>
                    <a>Have an account ? Login</a>
                </Link>
                <br />
                <Link href="/src/user/register" passHref>
                    <a>Dont have an account? Sign Up</a>
                </Link>
            </form>
        </>
    )
}
