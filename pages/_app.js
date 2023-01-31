import '@/styles/globals.scss'
import { Analytics } from '@vercel/analytics/react';
import NextNProgress from 'nextjs-progressbar'

export default function App({ Component, pageProps }) {
  return (
    <>
      <NextNProgress color="#000" height={2} options={{ showSpinner: false }} />
      <Component {...pageProps} />
      <Analytics />
    </>
  )
}
