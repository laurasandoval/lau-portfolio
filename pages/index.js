import GlobalHeader from '@/components/GlobalHeader/GlobalHeader'
import Grid from '@/components/Grid/Grid'
import { ProjectThumbnail } from '@/components/ProjectThumbnail/ProjectThumbnail'
import AccessibilityLabel from '@/components/AccessibilityLabel/AccessibilityLabel'
import { NextSeo } from 'next-seo'

export default function Home({ designWorkData, server }) {

  const _renderThumbnail = (project, index, featured, priority) => {
    return (
      <ProjectThumbnail
        {...project}
        as="article"
        hover
        autoplay
        key={index}
        portrait={featured}
        fadeIn
        priority={priority}
      />
    )
  }

  const maxFeaturedCount = 6

  const featuredProjects = designWorkData.slice(0, maxFeaturedCount)
  const remainingProjects = designWorkData.slice(maxFeaturedCount, featuredProjects.lenght)

  return (
    <>
      <NextSeo
        title="Laura Sandoval — Work, Résumé"
        description="Digital Product Designer & Engineer from Santiago, Chile. Featured clients include Uber, Cornershop, among others."
        openGraph={{
          title: "Laura Sandoval — Work, Résumé",
          description: "Digital Product Designer & Engineer from Santiago, Chile. Featured clients include Uber, Cornershop, among others.",
          images: [
            {
              url: `${server}/social-thumbnail.png`,
              width: 1200,
              height: 630,
              type: "image/png",
            }
          ],
        }}
        twitter={{
          handle: "@laurasideral",
          cardType: "summary_large_image",
        }}
        additionalLinkTags={[
          {
            rel: "icon",
            href: `${server}/favicon.ico`,
          },
          {
            rel: "apple-touch-icon",
            href: `${server}/logo192.png`
          }
        ]}
      />

      <GlobalHeader sticky />
      <AccessibilityLabel as="h2">Selected Works</AccessibilityLabel>
      <Grid featured>
        {featuredProjects.map((project, index) => {
          return _renderThumbnail(project, index, true, (index == 0 || index == 1))
        })}
      </Grid>
      <Grid>
        {remainingProjects.map((project, index) => {
          return _renderThumbnail(project, index, false, false)
        })}
      </Grid>
    </>
  )
}

export async function getServerSideProps(context) {
  const dev = process.env.NODE_ENV !== 'production'
  const server = dev ? `http://localhost:3000` : `https://${context.req.headers.host}`
  const url = `${server}/api/design-work`
  const res = await fetch(url)
  const designWorkData = await res.json()
  return { props: { designWorkData, server } }
}