import Data from '../../assets/design-work.json'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { useEffect, useState } from 'react'

export default function Project() {
  const router = useRouter()
  const slug = router.query.slug || []
  const [currentProject, setCurrentProject] = useState(null)

  const checkIfRouteIsValid = () => {
    const i = Data.DesignWork.findIndex(e => e.src === slug.join('/'))
    if (i > -1) {
      console.log("WENA CHORAZA");

      setCurrentProject(Data.DesignWork[i])
    } else {
      console.log("mmmmm not so wena choraza");
    }
  }

  useEffect(() => {
    checkIfRouteIsValid()
  })

  return (
    <>
      <Head>
        <title>{currentProject?.title}</title>
        <meta name="description" content="Digital Product Designer & Developer from Santiago, Chile. Featured clients include Uber, Cornershop, among others." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="image" content="/site-thumbnail.png" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/logo192.png" />
      </Head>

      <span>Hey! I'm a project!</span>
      <h1>{currentProject?.title}</h1>
      <h2>Slug: {slug.join('/')}</h2>
    </>
  )
}
