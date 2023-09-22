import type { AppProps } from 'next/app'
import Head from 'next/head'
import { QueryClient, QueryClientProvider } from 'react-query'
// eslint-disable-next-line import/no-unresolved
import { Analytics } from '@vercel/analytics/react'
import 'antd/dist/antd.css'
import { GlobalStyles } from '../styles/globalStyles'

const queryClient = new QueryClient({ defaultOptions: {} })

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Next | Template</title>
      </Head>
      <QueryClientProvider client={queryClient}>
        <Analytics />
        <GlobalStyles />
        <Component {...pageProps} />
      </QueryClientProvider>
    </>
  )
}

export default MyApp
