import GlobalHeader from '@/components/GlobalHeader/GlobalHeader'
import ProjectsGrid from '@/components/ProjectsGrid/ProjectsGrid'
import { ProjectThumbnail } from '@/components/ProjectThumbnail/ProjectThumbnail'
import AccessibilityLabel from '@/components/AccessibilityLabel/AccessibilityLabel'
import { NextSeo } from 'next-seo'
import GlobalFooter from '@/components/GlobalFooter/GlobalFooter'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import { getSortedPostsData } from '../lib/posts';
import BigParagraph from '@/components/BigParagraph/BigParagraph'
import IndexTabs from '@/components/IndexTabs/IndexTabs'
import './index.scss'
import { normalizeForUrl } from '@/lib/formatters'

export default function Home({ allPostsData, server }) {
  const router = useRouter();
  const feedsRef = useRef(null);
  const headerRef = useRef(null);
  const [selectedTab, setSelectedTab] = useState(0);
  const [headerHeight, setHeaderHeight] = useState(0);

  // Add new effect to measure header height
  useEffect(() => {
    const updateHeaderHeight = () => {
      if (headerRef.current) {
        const height = headerRef.current.getBoundingClientRect().height;
        setHeaderHeight(height);
      }
    };

    // Initial measurement
    updateHeaderHeight();

    // Update on resize
    window.addEventListener('resize', updateHeaderHeight);
    return () => window.removeEventListener('resize', updateHeaderHeight);
  }, []);

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
        id={project.id}
        as="article"
        hover
        key={index}
        portrait={featured}
        fadeIn
        priority={priority}
      />
    )
  }

  const markdown = `Hola! I am a curiosity-driven designer currently shaping the grocery shopping experience at [Uber](https://uber.com).
  
  For two years, I led consumer-facing product design at [Cornershop](https://latamlist.com/uber-acquires-cornershop-at-3b-valuation/), a grocery delivery startup acquired by Uber in 2021 for $3B. Following the acquisition, I joined Uber's Grocery & Retail team as a Product Designer, where I continue to drive Uber's Delivery vision forward.

  I also founded [Balance](http://lau.work/work/balance/app), the best-rated consumer transit app in Chile, and [Chaucha](http://lau.work/work/chaucha), which makes Chilean bank transfers a little bit easier.

  I am deeply passionate about the intersection of design and engineering, and building highly polished products.
  
  You can reach me at [@laurasideral](https://x.com/laurasideral) or [hi@lau.work](mailto:hi@lau.work), and browse some of my work & links below.
  `

  const pageTabs = [
    { label: "All Projects", defaultChecked: true },
    { label: "Type of Work" },
    { label: "Type of Client lalala this is a long tab" },
  ];

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

      <GlobalHeader
        sticky
        fadeIn
        ref={headerRef}
      />
      <BigParagraph
        statement={markdown}
      />

      <IndexTabs
        tabs={pageTabs}
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
        headerHeight={headerHeight}
        feedsRef={feedsRef}
      />

      <main className="feeds_container">
        <div className="feeds" ref={feedsRef}>
          <div className="feed" data-current>
            <ProjectsGrid>
              {allPostsData.map((project, index) => {
                return _renderThumbnail(project, index, false, false)
              })}
            </ProjectsGrid>
          </div>
          <div className="feed" data-current>
            <h2>Type of work feed</h2>
          </div>
          <div className="feed" data-current>
            <h2>Type of client feed</h2>
          </div>
        </div>
      </main>
      <GlobalFooter statement />
    </>
  )
}

export async function getServerSideProps(context) {
  const dev = process.env.NODE_ENV !== 'production'
  const server = dev ? `http://localhost:3000` : `https://${context.req.headers.host}`
  const allPostsData = getSortedPostsData();

  return {
    props: {
      allPostsData,
      server
    }
  }
}