import Head from 'next/head'
import { GlobalHeader } from '@/components/GlobalHeader/GlobalHeader'
import Grid from '@/components/Grid/Grid'
import { ProjectThumbnail } from '@/components/ProjectThumbnail/ProjectThumbnail'
import AccessibilityLabel from '@/components/AccessibilityLabel/AccessibilityLabel'

export default function Home({ designWorkData }) {

  const _renderThumbnail = (project, index, featured) => {
    return (
      <ProjectThumbnail
        {...project}
        as="article"
        hover
        autoplay
        key={index}
        portrait={featured}
        fadeIn
      />
    )
  }

  const maxFeaturedCount = 6

  const featuredProjects = designWorkData.slice(0, maxFeaturedCount)
  const remainingProjects = designWorkData.slice(maxFeaturedCount, featuredProjects.lenght)

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
      <AccessibilityLabel as="h2">Selected Works</AccessibilityLabel>
      <Grid featured>
        {featuredProjects.map((project, index) => {
          return _renderThumbnail(project, index, true)
        })}
      </Grid>
      <Grid>
        {remainingProjects.map((project, index) => {
          return _renderThumbnail(project, index)
        })}
      </Grid>
    </>
  )
}

export async function getServerSideProps() {
  const dev = process.env.NODE_ENV !== 'production'
  const server = dev ? `http://localhost:3000` : `https://${context.req.headers.host}`
  const url = `${server}/api/design-work`
  const res = await fetch(url)
  const designWorkData = await res.json()
  return { props: { designWorkData } }
}