import GlobalHeader from '@/components/GlobalHeader/GlobalHeader'
import ProjectsGrid from '@/components/ProjectsGrid/ProjectsGrid'
import { ProjectThumbnail } from '@/components/ProjectThumbnail/ProjectThumbnail'
import AccessibilityLabel from '@/components/AccessibilityLabel/AccessibilityLabel'
import { NextSeo } from 'next-seo'
import GlobalFooter from '@/components/GlobalFooter/GlobalFooter'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import BigParagraph from '@/components/BigParagraph/BigParagraph'

export default function Home({ designWorkData, server }) {
  const router = useRouter();

  // set scroll restoration to manual
  useEffect(() => {
    if ('scrollRestoration' in history && history.scrollRestoration !== 'manual') {
      history.scrollRestoration = 'manual';
    }
  }, []);

  // handle and store scroll position
  useEffect(() => {
    const handleRouteChange = () => {
      sessionStorage.setItem('scrollPosition', window.scrollY.toString());
    };

    router.events.on('routeChangeStart', handleRouteChange);
    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router.events]);

  // restore scroll position
  useEffect(() => {
    setTimeout(() => {
      if ('scrollPosition' in sessionStorage) {
        window.scrollTo(0, Number(sessionStorage.getItem('scrollPosition')));
        sessionStorage.removeItem('scrollPosition');
      }
    }, 10)
  }, []);

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

  const markdown = `Hola! I am a curiosity-driven designer currently shaping the grocery shopping experience at [Uber](https://uber.com).
  
  For two years, I led consumer-facing product design at [Cornershop](https://latamlist.com/uber-acquires-cornershop-at-3b-valuation/), a grocery delivery startup acquired by Uber in 2021 for $3B. Following the acquisition, I joined Uber's Grocery & Retail team as a Product Designer, where I continue to drive Uber's Delivery vision forward.

  I also founded [Balance](http://lau.work/design/balance/app), the best-rated consumer transit app in Chile, and [Chaucha](http://lau.work/design/chaucha), which makes Chilean bank transfers easier.

  I am deeply passionate about the intersection of design and engineering, and building highly polished products.
  
  You can reach me at [@laurasideral](https://x.com/laurasideral) or [hi@lau.work](mailto:hi@lau.work), and browse some of my work below.
  `

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

      <GlobalHeader sticky fadeIn />
      <BigParagraph
        statement={markdown}
      />
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