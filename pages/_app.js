import { SessionProvider } from "next-auth/react"
import React from "react"
import { Provider } from "react-redux"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Layout from "../components/Layout"

import store from "../redux/store"

function MyApp({ Component, pageProps: { session, ...pageProps } }) {

  return (
    <>
      <SessionProvider session={session}>
        <Provider store={store}>
          <Layout>
            <ToastContainer />
            <Component {...pageProps} />
          </Layout>
        </Provider>
      </SessionProvider>
    </>
  )
}




export default MyApp
