import GlobalHeader from '@/components/GlobalHeader/GlobalHeader'
import ProjectsGrid from '@/components/ProjectsGrid/ProjectsGrid'
import { ProjectThumbnail } from '@/components/ProjectThumbnail/ProjectThumbnail'
import AccessibilityLabel from '@/components/AccessibilityLabel/AccessibilityLabel'
import { NextSeo } from 'next-seo'
import GlobalFooter from '@/components/GlobalFooter/GlobalFooter'

export default function Home({ designWorkData, server }) {

  const _renderThumbnail = (project, index, featured, priority) => {
    return (
      <ProjectThumbnail
        {...project}
        as="article"
        hover
        key={index}
        portrait={featured}
        fadeIn
        priority={priority}
      />
    )
  }

  const maxFeaturedCount = 4

  const featuredProjects = designWorkData.slice(0, maxFeaturedCount)
  const remainingProjects = designWorkData.slice(maxFeaturedCount, featuredProjects.lenght)

  return (
    <>
      <NextSeo
        title="Laura Sandoval — Design, Photography, About"
        description="Digital Product Designer & Engineer. Featured works include projects for Uber, Uber Eats, Cornershop, among others."
        openGraph={{
          title: "Laura Sandoval — Design, Photography, About",
          description: "Digital Product Designer & Engineer. Featured works include projects for Uber, Uber Eats, Cornershop, among others.",
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
        additionalMetaTags={[
          {
            name: "theme-color",
            content: "#FFFFFF",
          },
        ]}
      />

      <GlobalHeader sticky />
      <AccessibilityLabel as="h2">Selected Works</AccessibilityLabel>
      <ProjectsGrid featured>
        {featuredProjects.map((project, index) => {
          return _renderThumbnail(project, index, true, (index == 0 || index == 1))
        })}
      </ProjectsGrid>
      <ProjectsGrid>
        {remainingProjects.map((project, index) => {
          return _renderThumbnail(project, index, false, false)
        })}
      </ProjectsGrid>
      <GlobalFooter statement />
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