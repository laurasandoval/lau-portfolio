import GlobalHeader from '@/components/GlobalHeader/GlobalHeader'
import ProjectsGrid from '@/components/ProjectsGrid/ProjectsGrid'
import { ProjectThumbnail } from '@/components/ProjectThumbnail/ProjectThumbnail'
import AccessibilityLabel from '@/components/AccessibilityLabel/AccessibilityLabel'
import { NextSeo } from 'next-seo'
import GlobalFooter from '@/components/GlobalFooter/GlobalFooter'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import { getSortedPostsData, getAllWorkTypes, getPostsByWorkType, getAllSectors, getPostsBySector } from '../lib/posts';
import BigParagraph from '@/components/BigParagraph/BigParagraph'
import IndexTabs from '@/components/IndexTabs/IndexTabs'
import './index.scss'
import { normalizeForUrl, formatYears } from '@/lib/formatters'

// Helper function to get first unused cover from posts
const getFirstUnusedCover = (posts, usedCovers) => {
  for (let i = 0; i < posts.length; i++) {
    if (posts[i].coverImage && !usedCovers.has(posts[i].coverImage)) {
      usedCovers.add(posts[i].coverImage);
      return posts[i].coverImage;
    }
  }
  return posts[0].coverImage; // Fallback to first cover if all are used
}

export default function Home({ allPostsData, workTypes, workTypePosts, sectors, sectorPosts, server }) {
  const router = useRouter();
  const feedsRef = useRef(null);
  const headerRef = useRef(null);
  const [selectedTab, setSelectedTab] = useState(0);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [isTabsSticking, setIsTabsSticking] = useState(false);

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
        title={project.title}
        subtitle={project.subtitle || formatYears(project.startYear, project.endYear)}
        asset={project.coverImage}
        url={`/work/${project.id}`}
        as="article"
        key={index}
        portrait={featured}
        fadeIn
        priority={priority}
      />
    )
  }

  const _normalizedDisciplineName = (type) => {
    const posts = workTypePosts[type];
    if (!posts[0].workType) {
      // Fallback to basic normalization if no workType found
      const cleanedDisciplineName = type.replaceAll("-", " ");
      const words = cleanedDisciplineName.split(" ");
      for (let i = 0; i < words.length; i++) {
        words[i] = words[i][0].toUpperCase() + words[i].substr(1);
      }
      return words.join(" ");
    }

    const matchingDiscipline = posts[0].workType.find(discipline =>
      normalizeForUrl(discipline) === type
    );

    return matchingDiscipline || type;
  }

  const _renderDisciplineThumbnail = (type, index) => {
    const posts = workTypePosts[type];
    const cover = getFirstUnusedCover(posts, disciplineCovers);
    return (
      <ProjectThumbnail
        title={_normalizedDisciplineName(type)}
        subtitle={`${posts.length} ${posts.length === 1 ? 'project' : 'projects'}`}
        asset={cover}
        url={`/work/discipline/${type}`}
        as="article"
        key={index}
        fadeIn
        collection={true}
      />
    )
  }

  const _normalizedSectorName = (type) => {
    const posts = sectorPosts[type];
    if (!posts[0].clientSector) {
      // Fallback to basic normalization if no clientSector found
      const cleanedSectorName = type.replaceAll("-", " ");
      const words = cleanedSectorName.split(" ");
      for (let i = 0; i < words.length; i++) {
        words[i] = words[i][0].toUpperCase() + words[i].substr(1);
      }
      return words.join(" ");
    }

    const matchingSector = posts[0].clientSector.find(sector =>
      normalizeForUrl(sector) === type
    );

    return matchingSector || type;
  }

  const _renderSectorThumbnail = (type, index) => {
    const posts = sectorPosts[type];
    const cover = getFirstUnusedCover(posts, sectorCovers);
    return (
      <ProjectThumbnail
        title={_normalizedSectorName(type)}
        subtitle={`${posts.length} ${posts.length === 1 ? 'project' : 'projects'}`}
        asset={cover}
        url={`/work/sector/${type}`}
        as="article"
        key={index}
        fadeIn
        collection={true}
      />
    )
  }

  const maxFeaturedCount = 2
  const disciplineCovers = new Set(); // Track used covers for disciplines
  const sectorCovers = new Set(); // Track used covers for sectors

  const featuredProjects = allPostsData.slice(0, maxFeaturedCount)
  const remainingProjects = allPostsData.slice(maxFeaturedCount, featuredProjects.lenght)

  const markdown = `Hola! I am a curiosity-driven designer currently shaping the grocery shopping experience at [Uber](https://uber.com).
  
  For two years, I led consumer-facing product design at [Cornershop](https://latamlist.com/uber-acquires-cornershop-at-3b-valuation/), a grocery delivery startup acquired by Uber in 2021 for $3B. Following the acquisition, I joined Uber's Grocery & Retail team as a Product Designer, where I continue to drive Uber's Delivery vision forward.

  I also founded [Balance](http://lau.work/work/balance/app), the best-rated consumer transit app in Chile, and [Chaucha](http://lau.work/work/chaucha), which makes Chilean bank transfers a little bit easier.

  I am deeply passionate about the intersection of design and engineering, and building highly polished products.
  
  You can reach me at [@laurasideral](https://x.com/laurasideral) or [hi@lau.work](mailto:hi@lau.work), and browse some of my work & links below.
  `

  const pageTabs = [
    { label: "All Projects", defaultChecked: true },
    { label: "Grouped by Discipline" },
    { label: "Grouped by Sector" },
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
        forceBorderHidden={isTabsSticking}
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
        onStickingChange={setIsTabsSticking}
      />

      <main className="feeds_container">
        <div className="feeds" ref={feedsRef}>
          <div className="feed" data-current>
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
          </div>
          <div className="feed" data-current>
            <ProjectsGrid showAll>
              {workTypes?.map((type, index) => {
                return _renderDisciplineThumbnail(type, index)
              })}
            </ProjectsGrid>
          </div>
          <div className="feed" data-current>
            <ProjectsGrid showAll>
              {sectors?.map((type, index) => {
                return _renderSectorThumbnail(type, index)
              })}
            </ProjectsGrid>
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

  // Get work types and their posts
  const workTypes = getAllWorkTypes() || [];
  const workTypePosts = {};
  workTypes.forEach(type => {
    workTypePosts[type] = getPostsByWorkType(type);
  });

  // Get sectors and their posts
  const sectors = getAllSectors() || [];
  const sectorPosts = {};
  sectors.forEach(type => {
    sectorPosts[type] = getPostsBySector(type);
  });

  return {
    props: {
      allPostsData,
      workTypes,
      workTypePosts,
      sectors,
      sectorPosts,
      server
    }
  }
}