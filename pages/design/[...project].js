import './[...project].scss'
import GlobalHeader from '@/components/GlobalHeader/GlobalHeader'
import { ProjectThumbnail } from '@/components/ProjectThumbnail/ProjectThumbnail'
import { NextSeo } from 'next-seo'
import Button from '@/components/Button/Button'
import { Balancer } from 'react-wrap-balancer'
import parse from 'html-react-parser';
import { getAllPostIds, getPostData, getSortedPostsData } from '../../lib/posts'
import GlobalFooter from '@/components/GlobalFooter/GlobalFooter'
import NextProjectPeek from '@/components/NextProjectPeek/NextProjectPeek'

export default function Project({ currentPostData, nextPostData, server }) {
  const getColorLuminance = (color) => {
    const hex = color.replace("#", "");
    const r = parseInt(hex.substring(0, 2), 16) / 255;
    const g = parseInt(hex.substring(2, 4), 16) / 255;
    const b = parseInt(hex.substring(4, 6), 16) / 255;

    const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;

    return luminance;
  }

  const renderContent = (htmlString) => {
    const options = {
      replace: (domNode) => {
        // Check if the current node is a <p> tag containing only an <img> tag
        if (domNode.name === 'p' && domNode.children.length === 1 && domNode.children[0].name === 'img') {
          const { src, alt } = domNode.children[0].attribs; // Get src and alt from the img tag
          return (
            <figure>
              <ProjectThumbnail
                coverImage={src}
                autoplay={true}
                img_only
                placeholder={false}
              />
              {alt && <figcaption>{alt}</figcaption>}
            </figure>
          );
        }
      },
    };

    return parse(htmlString, options);
  };

  const formatYears = (startYear, endYear) => {
    if (startYear && endYear) {
      return startYear === endYear ? `${startYear}` : `${startYear} — ${endYear}`;
    } else if (startYear && endYear === null) {
      return `Since ${startYear}`;
    } else if (endYear && startYear === null) {
      return `Until ${endYear}`;
    } else {
      return null;
    }
  };

  const formatCategories = (categories) => {
    if (!categories || categories.length === 0) return null;

    if (categories.length === 1) {
      return categories[0];
    } else {
      return categories.slice(0, 3).join(', ');
    }
  };

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
        className="design_project_article"
        data-name={currentPostData?.title}
      >
        <div className="header">
          <div className="basic_info">
            <h2 className="title">
              <Balancer>
                {currentPostData.title}
              </Balancer>
            </h2>
            <p className="period">{formatYears(currentPostData.startYear, currentPostData.endYear)} · {formatCategories(currentPostData.categories)}</p>
          </div>
          <p className="excerpt">
            <Balancer>
              {currentPostData.excerpt}
            </Balancer>
          </p>
          <ProjectThumbnail
            coverImage={currentPostData.coverImage}
            autoplay={true}
            img_only
            placeholder={false}
          />
          <hr />
        </div>
        <div className="body">
          {renderContent(currentPostData.contentHtml)}
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
  const server = dev ? `http://localhost:3000` : `https://lau.work`
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
