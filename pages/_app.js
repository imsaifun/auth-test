import { SessionProvider } from "next-auth/react"
import Head from "next/head"
import PropTypes from "prop-types"
import React from "react"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Layout from "../components/Layout"

import { wrapper } from "../redux/store"

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  

  return (
    <React.Fragment>
      <Head>
        <title>My page</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
        <SessionProvider session={session}>
          <Layout>
            <ToastContainer />
            <Component {...pageProps} />
          </Layout>
        </SessionProvider>
    </React.Fragment>
  )
}

export default wrapper.withRedux(MyApp)
