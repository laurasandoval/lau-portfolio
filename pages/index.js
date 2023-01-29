import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.scss'
import { GlobalHeader } from '@/components/GlobalHeader/GlobalHeader'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Laura Sandoval — Work</title>
        <meta name="description" content="Digital Product Designer & Developer from Santiago, Chile. Featured clients include Uber, Cornershop, among others." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="image" content="/site-thumbnail.png" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/logo192.png" />
      </Head>

      <GlobalHeader sticky />
    </>
  )
}
