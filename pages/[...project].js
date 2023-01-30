import { useRouter } from 'next/router'
import Head from 'next/head'

export default function Project({ currentProject }) {
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
      <h2>Slug: {currentProject.src}</h2>
    </>
  )
}

export async function getServerSideProps(context) {
  const dev = process.env.NODE_ENV !== 'production';
  const server = dev ? `http://localhost:3000` : `https://${context.req.headers.host}`;
  const url = `${server}/api/design-work`;
  const res = await fetch(url);
  const designWorkData = await res.json();

  const projectSrc = context.query.project.join('/') || []
  let currentProject

  const i = designWorkData.findIndex(e => e.src === projectSrc)
  if (i > -1) {
    currentProject = designWorkData[i]
  } else {
    return {
      notFound: true,
    }
  }

  return {
    props: { currentProject }
  };
}
