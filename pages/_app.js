import '@/styles/globals.scss'
import { Analytics } from '@vercel/analytics/react';
import { Inter } from '@next/font/google'
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
        <Component {...pageProps} />
        <Analytics />
      </Provider>
    </>
  )
}
