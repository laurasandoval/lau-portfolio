import { useRouter } from 'next/router'
import Head from 'next/head'

export default function Project({ dataExport }) {
  const router = useRouter()
  const slug = router.query.slug || []
  let currentProject;

  const checkIfRouteIsValid = () => {
    const i = dataExport.findIndex(e => e.src === slug.join('/'))
    if (i > -1) {
      console.log("WENA CHORAZA");

      currentProject = dataExport[i]
    } else {
      console.log("mmmmm not so wena choraza");
    }
  }

  checkIfRouteIsValid()

  return (
    <>
      <Head>
        <title>{currentProject?.title}</title>
        <meta name="description" content={`${currentProject?.description[0]}`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="image" content={`/Work/${currentProject?.src}/thumbnails/${currentProject?.social_thumbnail}`} />

        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/logo192.png" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={currentProject?.title} />
        <meta property="og:description" content={`${currentProject?.description[0]}`} />
        <meta property="og:image" content={`/Work/${currentProject?.src}/thumbnails/${currentProject?.social_thumbnail}`} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={currentProject?.title} />
        <meta name="twitter:description" content={`${currentProject?.description[0]}`} />
        <meta name="twitter:image" content={`/Work/${currentProject?.src}/thumbnails/${currentProject?.social_thumbnail}`} />
      </Head>

      <span>Hey! I'm a project!</span>
      <h1>{currentProject?.title}</h1>
      <h2>Slug: {slug.join('/')}</h2>
    </>
  )
}

export async function getServerSideProps() {
  const url = "https://lau-portfolio-nextjs.vercel.app/api/design-work";
  const res = await fetch(url);
  const dataExport = await res.json();
  return { props: { dataExport } };
}
