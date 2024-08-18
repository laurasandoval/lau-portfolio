import './[...project].scss'
import GlobalHeader from '@/components/GlobalHeader/GlobalHeader'
import { throttle } from 'lodash'
import { useEffect, useRef, useState } from 'react'
import { ProjectThumbnail } from '@/components/ProjectThumbnail/ProjectThumbnail'
import AccessibilityLabel from '@/components/AccessibilityLabel/AccessibilityLabel'
import { NextSeo } from 'next-seo'
import Button from '@/components/Button/Button'
import { Balancer } from 'react-wrap-balancer'
import { getAllPostIds, getPostData, getSortedPostsData } from '../../lib/posts'
import GlobalFooter from '@/components/GlobalFooter/GlobalFooter'
import NextProjectPeek from '@/components/NextProjectPeek/NextProjectPeek'

export default function Project({ currentPostData, nextPostData, server }) {
  const [showGalleryBorder, setShowGalleryBorder] = useState(false)
  const [projectInfoChildCount, setProjectInfoChildCount] = useState(0)
  const projectGalleryContainer = useRef(null)
  const projectGallery = useRef(null)
  const projectInfo = useRef(null);

  useEffect(() => {
    console.log(currentPostData)
    window.addEventListener("scroll", _throttledScrollCheck)

    if (projectInfo) {
      setProjectInfoChildCount(projectInfo.current.childNodes.length + 2);
    }

    return () => document.removeEventListener("scroll", _throttledScrollCheck)
  }, [currentPostData]);

  useEffect(() => {
    projectGallery.current.scroll({
      left: 0
    });
  }, [currentPostData])

  const _throttledScrollCheck = throttle(() => {
    if (
      projectGalleryContainer.current &&
      projectGalleryContainer.current.offsetTop <= window.scrollY
    ) {
      setShowGalleryBorder(true)
    } else {
      setShowGalleryBorder(false)
    }
  }, 250)

  const getColorLuminance = (color) => {
    const hex = color.replace("#", "");
    const r = parseInt(hex.substring(0, 2), 16) / 255;
    const g = parseInt(hex.substring(2, 4), 16) / 255;
    const b = parseInt(hex.substring(4, 6), 16) / 255;

    const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;

    return luminance;
  }

  const projectThemeColor = currentPostData.customThemeColorHex ?? "#000000";
  const luminance = getColorLuminance(projectThemeColor);
  const textColor = luminance > 0.5 ? "#000000" : "#FFFFFF";

  return (
    <>
      <NextSeo
        title={`${currentPostData.title} — Laura Sandoval`}
        description={`${currentPostData.excerpt}`}
        openGraph={{
          title: `${currentPostData.title} — Laura Sandoval`,
          description: `${currentPostData.excerpt}`,
          images: [
            {
              url: `${server}${currentPostData.ogImage}`,
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

      <GlobalHeader />

      <style>
        {`
          ::selection {
              background: ${projectThemeColor}!important;
              color: ${textColor}!important;
          }
        `}
      </style>

      <article
        className="project_page_fallback"
        data-name={currentPostData?.title}
      >
        <div
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
            <ProjectThumbnail
              {...currentPostData}
              img_only
              placeholder={false}
            />
            {currentPostData.otherImages &&
              currentPostData.otherImages.map((src, index) => {
                return (
                  <ProjectThumbnail
                    {...currentPostData}
                    coverImage={src}
                    key={src}
                    priority={false}
                    img_only
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
                {currentPostData.title}
              </Balancer>
            </h2>
            <p className="period">
              {
                currentPostData.startYear && currentPostData.endYear ?
                  currentPostData.startYear == currentPostData.endYear ?
                    `${currentPostData.startYear}` :
                    `${currentPostData.startYear} — ${currentPostData.endYear}`
                  : currentPostData.startYear && currentPostData.endYear === null
                    ? `Since ${currentPostData.startYear}`
                    : currentPostData.endYear && currentPostData.startYear === null
                      ? `Until ${currentPostData.endYear}`
                      : null
              }
            </p>
          </div>
          <div
            className="description"
            dangerouslySetInnerHTML={{ __html: currentPostData.contentHtml }}
          />
          {currentPostData?.cta && (
            <div className="ctas">
              {currentPostData?.cta.map((cta, i) => {
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
          {currentPostData.team && (
            <div className="credits">
              {Object.entries(currentPostData.team).map(([teamName, members]) => (
                <div className="item" key={teamName}>
                  <h3>{teamName}</h3>
                  {members.map((member, index) => (
                    <p key={index}>{member}</p>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>
      </article>

      <GlobalFooter />

      {
        nextPostData != null &&
        <NextProjectPeek id={nextPostData.project} {...nextPostData} />
      }
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
  const dev = process.env.NODE_ENV !== 'production'
  const server = dev ? `http://localhost:3000` : `https://${context.req.headers.host}`
  const allPosts = getSortedPostsData(); // Fetch and sort all posts
  const currentPostIndex = allPosts.findIndex(post => post.id === params.project.join('/'));

  const currentPostData = await getPostData(params.project.join('/'));

  let nextPostData = null;
  if (currentPostIndex !== -1 && currentPostIndex < allPosts.length - 1) {
    const nextPost = allPosts[currentPostIndex + 1];
    nextPostData = await getPostData(nextPost.id);
  }

  return {
    props: {
      currentPostData,
      nextPostData,
      server
    },
  };
}
