import '@/styles/globals.scss'
import { Analytics } from '@vercel/analytics/react';
import { Inter } from '@next/font/google'
import NextNProgress from 'nextjs-progressbar'
import { Provider } from 'react-wrap-balancer';

const inter = Inter({ subsets: ['latin'] })

export default function App({ Component, pageProps }) {
  return (
    <>
      <Provider>
        <style jsx global>{`
        html {
          font-family: ${inter.style.fontFamily};
        }
      `}</style>
        <NextNProgress color="#000" height={2} options={{ showSpinner: false }} />
        <Component {...pageProps} />
        <Analytics />
      </Provider>
    </>
  )
}
