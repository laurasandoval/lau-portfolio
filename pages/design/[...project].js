import './[...project].scss'
import GlobalHeader from '@/components/GlobalHeader/GlobalHeader'
import { throttle } from 'lodash'
import { useEffect, useRef, useState } from 'react'
import { ProjectThumbnail } from '@/components/ProjectThumbnail/ProjectThumbnail'
import AccessibilityLabel from '@/components/AccessibilityLabel/AccessibilityLabel'
import { NextSeo } from 'next-seo'
import Button from '@/components/Button/Button'
import { Balancer } from 'react-wrap-balancer'
import { getAllPostIds, getPostData } from '../../lib/posts'
import GlobalFooter from '@/components/GlobalFooter/GlobalFooter'
import NextProjectPeek from '@/components/NextProjectPeek/NextProjectPeek'

export default function Project({ server, postData }) {
  // const [showGalleryBorder, setShowGalleryBorder] = useState(false)
  // const [projectInfoChildCount, setProjectInfoChildCount] = useState(0)
  // const projectGalleryContainer = useRef(null)
  // const projectGallery = useRef(null)
  // const projectInfo = useRef(null);

  // useEffect(() => {
  //   window.addEventListener("scroll", _throttledScrollCheck)

  //   if (projectInfo) {
  //     setProjectInfoChildCount(projectInfo.current.childNodes.length + 2);
  //   }

  //   return () => document.removeEventListener("scroll", _throttledScrollCheck)
  // }, [currentProject]);

  // useEffect(() => {
  //   projectGallery.current.scroll({
  //     left: 0
  //   });
  // }, [currentProject])

  // const _throttledScrollCheck = throttle(() => {
  //   if (
  //     projectGalleryContainer.current &&
  //     projectGalleryContainer.current.offsetTop <= window.scrollY
  //   ) {
  //     setShowGalleryBorder(true)
  //   } else {
  //     setShowGalleryBorder(false)
  //   }
  // }, 250)

  // const getColorLuminance = (color) => {
  //   const hex = color.replace("#", "");
  //   const r = parseInt(hex.substring(0, 2), 16) / 255;
  //   const g = parseInt(hex.substring(2, 4), 16) / 255;
  //   const b = parseInt(hex.substring(4, 6), 16) / 255;

  //   const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;

  //   return luminance;
  // }

  // const projectThemeColor = currentProject.custom_theme_color_hex ?? "#000000";
  // const luminance = getColorLuminance(projectThemeColor);
  // const textColor = luminance > 0.5 ? "#000000" : "#FFFFFF";

  return (
    <>
      {/* <NextSeo
        title={`${postData.title} — Laura Sandoval`}
        description={`${postData.description[0]}`}
        openGraph={{
          title: `${postData.title} — Laura Sandoval`,
          description: `${postData.description[0]}`,
          images: [
            {
              url: `${server}/assets/design-work/${postData.src}/${postData.social_thumbnail}`,
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
      /> */}

      <GlobalHeader />

      {/* <style>
        {`
          ::selection {
              background: ${projectThemeColor}!important;
              color: ${textColor}!important;
          }
        `}
      </style> */}

      <article
        className="project_page_fallback"
        data-name={postData?.title}
      >
        {postData.title}
        <br />
        {postData.project}
        <br />
        {postData.date}
        {/* <div
          className="project_gallery_container"
          ref={projectGalleryContainer}
          data-show-border={showGalleryBorder}
          style={{
            "--project-info-child-count": projectInfoChildCount
          }}
        >
          <div
            className="project_gallery"
            ref={projectGallery}
          >
            {currentProject?.thumbnails.map((thumbnail, index) => {
              return (
                <ProjectThumbnail
                  {...currentProject}
                  img_only
                  thumbnail={thumbnail}
                  key={thumbnail}
                  priority={index == 0}
                  placeholder={false}
                />
              )
            })}
          </div>
          <hr />
        </div>
        <div
          className="project_info"
          ref={projectInfo}
        >
          <div className="header">
            <h2 className="title">
              <Balancer>
                {currentProject?.title}
              </Balancer>
            </h2>
            <p className="period">{currentProject?.period}</p>
          </div>
          {
            currentProject?.description &&
            <div className="description">
              {currentProject?.description.map((paragraph, i) => {
                return (
                  <p key={i}>
                    {paragraph}
                  </p>
                )
              })}
            </div>
          }
          {currentProject?.cta && (
            <div className="ctas">
              {currentProject?.cta.map((cta, i) => {
                return (
                  <Button
                    type="secondary"
                    key={i}
                    link={true}
                    href={cta.url}
                    label={cta.title}
                  />
                )
              })}
            </div>
          )}
          <div className="credits">
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
        </div> */}
      </article>

      <GlobalFooter />

      {/* {
        nextProject != null &&
        <NextProjectPeek {...nextProject} />
      } */}
    </>
  )
}

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const postData = getPostData(params.project.join('/'));
  return {
    props: {
      postData,
    },
  };
}
