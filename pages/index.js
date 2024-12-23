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
import './index.scss'

export default function Home({ allPostsData, server }) {
  const router = useRouter();
  const feedsRef = useRef(null);
  const tabsRef = useRef([]);
  const currentTabIndicatorRef = useRef(null);
  const [selectedTab, setSelectedTab] = useState(0);

  useEffect(() => {
    const feeds = feedsRef.current;
    const tabs = tabsRef.current;
    const currentTabIndicator = currentTabIndicatorRef.current;

    let tabPositions = []; // cache tab dimensions and positions

    const calculateTabPositions = () => {
      tabPositions = tabs
        .filter((tab) => tab)
        .map((tab) => {
          const rect = tab.getBoundingClientRect();
          return {
            offsetLeft: rect.left + window.scrollX,
            width: rect.width,
          };
        });
    };

    const updateTabIndicatorAndHeight = () => {
      const scrollLeft = feeds.scrollLeft;
      const viewportWidth = feeds.offsetWidth;

      if (!tabPositions || tabPositions.length === 0) return;

      const currentIndex = Math.floor(scrollLeft / viewportWidth);
      const nextIndex = Math.min(currentIndex + 1, tabPositions.length - 1);

      const currentTab = tabs[currentIndex];
      const nextTab = tabs[nextIndex] || currentTab;

      const interpolationFactor = (scrollLeft % viewportWidth) / viewportWidth;

      // interpolate tab indicator position and width
      const current = tabPositions[currentIndex];
      const next = tabPositions[nextIndex];
      if (!current || !next) return;

      const interpolatedOffset =
        current.offsetLeft + interpolationFactor * (next.offsetLeft - current.offsetLeft);
      const interpolatedWidth =
        current.width + interpolationFactor * (next.width - current.width);

      currentTabIndicator.style.setProperty('--leading-offset', `${Math.round(interpolatedOffset)}px`);
      currentTabIndicator.style.setProperty('--width', `${Math.round(interpolatedWidth)}px`);

      // update feed height dynamically
      const feedElements = feeds.children;
      const currentFeed = feedElements[currentIndex];
      const nextFeed = feedElements[nextIndex] || currentFeed;

      const currentFeedHeight = currentFeed.offsetHeight;
      const nextFeedHeight = nextFeed.offsetHeight;

      const interpolatedHeight =
        currentFeedHeight + interpolationFactor * (nextFeedHeight - currentFeedHeight);

      feeds.style.setProperty('--current-feed-height', `${Math.round(interpolatedHeight)}px`);
    };

    const syncTabsWithScroll = () => {
      const scrollLeft = feeds.scrollLeft;
      const viewportWidth = feeds.offsetWidth;

      const currentIndex = Math.round(scrollLeft / viewportWidth);
      setSelectedTab(currentIndex); // update the selected tab index
    };

    const onScroll = () => {
      requestAnimationFrame(() => {
        updateTabIndicatorAndHeight();
        syncTabsWithScroll();
      });
    };

    feeds.addEventListener('scroll', onScroll);
    window.addEventListener('resize', calculateTabPositions);

    setTimeout(() => {
      calculateTabPositions();
      updateTabIndicatorAndHeight();
    }, 10);

    return () => {
      feeds.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', calculateTabPositions);
    };
  }, []);

  const handleTabChange = (index) => {
    const feeds = feedsRef.current;
    const viewportWidth = feeds.offsetWidth;

    setSelectedTab(index); // update the selected tab state
    feeds.scrollTo({
      left: index * viewportWidth, // scroll to the corresponding feed
      behavior: 'smooth', // ensure smooth scrolling
    });
  };

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

  const tabLabels = [
    { id: "all-projects", name: "sample", value: "all-projects", label: "All Projects", defaultChecked: true },
    { id: "type-of-work", name: "sample", value: "type-of-work", label: "Type of Work" },
    { id: "type-of-company", name: "sample", value: "type-of-company", label: "Type of Company" },
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

      <GlobalHeader sticky fadeIn />
      <BigParagraph
        statement={markdown}
      />

      <div className="tabs">
        <span className="current_tab_indicator" ref={currentTabIndicatorRef}></span>

        {tabLabels.map(({ id, name, value, label }, index) => (
          <div
            className="tab"
            key={id}
            ref={(el) => {
              if (el) tabsRef.current[index] = el;
            }}
          >
            <input
              type="radio"
              id={id}
              name={name}
              value={value}
              checked={selectedTab === index} // synchronize with selectedTab state
              onChange={() => handleTabChange(index)} // update the feed on tab change
            />
            <label htmlFor={id}>{label}</label>
          </div>
        ))}
      </div>

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
            <h2>Type of client feed</h2>
          </div>
          <div className="feed" data-current>
            <h2>Type of work feed</h2>
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