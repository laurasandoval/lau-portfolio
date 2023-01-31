import './[...project].scss'
import GlobalHeader from '@/components/GlobalHeader/GlobalHeader'
import { throttle } from 'lodash'
import { useEffect, useRef, useState } from 'react'
import { ProjectThumbnail } from '@/components/ProjectThumbnail/ProjectThumbnail'
import AccessibilityLabel from '@/components/AccessibilityLabel/AccessibilityLabel'
import { NextSeo } from 'next-seo'

export default function Project({ currentProject }) {
  const [showGalleryBorder, setShowGalleryBorder] = useState(false)
  const projectGallery = useRef(null)

  useEffect(() => {
    window.addEventListener("scroll", _throttledScrollCheck)
    return () => document.removeEventListener("scroll", _throttledScrollCheck)
  })

  const _throttledScrollCheck = throttle(() => {
    if (
      projectGallery.current &&
      projectGallery.current.offsetTop <= window.scrollY
    ) {
      setShowGalleryBorder(true)
    } else {
      setShowGalleryBorder(false)
    }
  }, 250)

  return (
    <>
      <NextSeo
        title={`${currentProject?.title} — Laura Sandoval`}
        description={`${currentProject?.description[0]}`}
        openGraph={{
          title: `${currentProject?.title} — Laura Sandoval`,
          description: `${currentProject?.description[0]}`,
          images: [
            {
              url: `/assets/design-work/${currentProject?.src}/${currentProject?.social_thumbnail}`,
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
            href: "/favicon.ico",
          },
          {
            rel: "apple-touch-icon",
            href: "/logo192.png"
          }
        ]}
      />

      <GlobalHeader />
      <article className="project_page_fallback" data-name={currentProject?.title}>
        <div
          className="project_gallery"
          data-show-border={showGalleryBorder}
          ref={projectGallery}
        >
          {currentProject?.thumbnails.map((thumbnail, index) => {
            return (
              <ProjectThumbnail
                {...currentProject}
                img_only
                thumbnail={thumbnail}
                key={index}
                autoplay
              />
            )
          })}
        </div>
        <div className="project_info">
          <div className="main">
            <h2 className="title">{currentProject?.title}</h2>
            {
              currentProject?.description &&
              <div className="description">
                {currentProject?.description.map((p, i) => {
                  return <p key={i}>{p}</p>
                })}
              </div>
            }
            {currentProject?.cta && (
              <div className="ctas">
                {currentProject?.cta.map((cta, i) => {
                  return (
                    <a
                      className="call_to_action"
                      key={i}
                      href={cta.url}
                      rel="noopener noreferrer"
                    >
                      {cta.title}{" "}
                      <span className="right_arrow" aria-hidden="true">
                        →
                      </span>
                    </a>
                  )
                })}
              </div>
            )}
          </div>
          <div className="credits">
            {currentProject?.client && (
              <div className="item" role="text">
                <h3>
                  Client<AccessibilityLabel>: </AccessibilityLabel>
                </h3>
                <p>{currentProject?.client}</p>
              </div>
            )}
            <div className="item" role="text">
              <h3>
                Year<AccessibilityLabel>: </AccessibilityLabel>
              </h3>
              <p>{currentProject?.year}</p>
            </div>
            {currentProject?.team &&
              Object.keys(currentProject?.team).map((item, i) => {
                return (
                  <div className="item" key={i} role="text">
                    <h3>
                      {item}
                      <AccessibilityLabel>: </AccessibilityLabel>
                    </h3>
                    {currentProject?.team[item].map((person, i) => {
                      if (currentProject?.team[item].length > 1) {
                        if (i + 1 === currentProject?.team[item].length) {
                          return (
                            <p key={i}>
                              {person.name}
                              <AccessibilityLabel>.</AccessibilityLabel>
                            </p>
                          )
                        } else if (
                          i + 1 ===
                          currentProject?.team[item].length - 1
                        ) {
                          return (
                            <p key={i}>
                              {person.name}
                              <AccessibilityLabel> and </AccessibilityLabel>
                            </p>
                          )
                        } else {
                          return (
                            <p key={i}>
                              {person.name}
                              <AccessibilityLabel>, </AccessibilityLabel>
                            </p>
                          )
                        }
                      } else {
                        return <p key={i}>{person.name}</p>
                      }
                    })}
                  </div>
                )
              })}
          </div>
        </div>
      </article>
    </>
  )
}

export async function getServerSideProps(context) {
  const dev = process.env.NODE_ENV !== 'production'
  const server = dev ? `http://localhost:3000` : `https://${context.req.headers.host}`
  const url = `${server}/api/design-work`
  const res = await fetch(url)
  const designWorkData = await res.json()

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
  }
}
