import Head from 'next/head'

export default function Resume() {
  return (
    <>
      <Head>
        <title>Laura Sandoval — Résumé</title>
        <meta name="description" content="Digital Product Designer & Developer from Santiago, Chile. Featured clients include Uber, Cornershop, among others." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="image" content="/site-thumbnail.png" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/logo192.png" />
      </Head>
    </>
  )
}

export async function getServerSideProps(context) {
  const dev = process.env.NODE_ENV !== 'production'
  const server = dev ? `http://localhost:3000` : `https://${context.req.headers.host}`
  const url = `${server}/api/latest-resume`
  const res = await fetch(url)
  const latestResume = await res.json()

  if (latestResume.file_name) {
    return {
      redirect: {
        destination: `/resume/${latestResume.file_name}`,
        permanent: false,
      },
    }
  } else {
    return {
      notFound: true,
    }
  }
}