import './[...project].scss'
import GlobalHeader from '@/components/GlobalHeader/GlobalHeader'
import { ProjectThumbnail } from '@/components/ProjectThumbnail/ProjectThumbnail'
import { NextSeo } from 'next-seo'
import Button from '@/components/Button/Button'
import { Balancer } from 'react-wrap-balancer'
import parse from 'html-react-parser';
import { getAllPostIds, getPostData, getSortedPostsData, getPostsByFolder, getAllFolders } from '../../lib/posts'
import GlobalFooter from '@/components/GlobalFooter/GlobalFooter'
import NextProjectPeek from '@/components/NextProjectPeek/NextProjectPeek'
import { ProjectArticleHeader } from '@/components/ProjectArticleHeader/ProjectArticleHeader'
import ProjectArticleAsset from '@/components/ProjectArticleAsset/ProjectArticleAsset'
import { formatYears } from '@/lib/formatters'
import ProjectsGrid from '@/components/ProjectsGrid/ProjectsGrid'
import FolderPage from './folder-page'

export default function Project({ isFolder, folderName, posts, currentPostData, nextPostData, server }) {
  if (isFolder) {
    return (
      <FolderPage
        folderName={folderName}
        posts={posts}
      />
    );
  }

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
            <ProjectArticleAsset
              src={src}
              caption={alt}
            />
          );
        }
      },
    };

    return parse(htmlString, options);
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
      // additionalMetaTags={[
      //   {
      //     name: "theme-color",
      //     content: projectThemeColor,
      //   },
      // ]}
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
        <ProjectArticleHeader postData={currentPostData} />
        <div className="body">
          <div className="content">
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
          </div>
          <div className="credits">
            {(currentPostData.startYear || currentPostData.endYear) &&
              <div className="item">
                <h3>Period</h3>
                <p>{formatYears(currentPostData.startYear, currentPostData.endYear)}</p>
              </div>
            }
            {currentPostData.client &&
              <div className="item">
                <h3>Client</h3>
                {currentPostData.client.map((client, i) => {
                  return (
                    <p key={i}>{client}</p>
                  )
                })}
              </div>
            }
            {currentPostData.clientSector &&
              <div className="item">
                <h3>Sector</h3>
                {currentPostData.clientSector.map((clientSector, i) => {
                  return (
                    <p key={i}>{clientSector}</p>
                  )
                })}
              </div>
            }
            {currentPostData.workType &&
              <div className="item">
                <h3>Discipline</h3>
                {currentPostData.workType.map((workType, i) => {
                  return (
                    <p key={i}>{workType}</p>
                  )
                })}
              </div>
            }
            {currentPostData.team && Object.entries(currentPostData.team).map(([teamName, members]) => (
              <div className="item" key={teamName}>
                <h3>{teamName}</h3>
                {members.map((member, index) => (
                  <p key={index}>{member}</p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </article>

      <GlobalFooter />

      {
        nextPostData != null &&
        <NextProjectPeek nextPostData={nextPostData} />
      }
    </>
  )
}

export async function getStaticPaths() {
  const postPaths = getAllPostIds();
  const folderPaths = getAllFolders();

  return {
    paths: [...postPaths, ...folderPaths],
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const dev = process.env.NODE_ENV !== 'production'
  const server = dev ? `http://localhost:3000` : `https://lau.work`
  const folderPaths = getAllFolders();

  const isFolder = params.project.length === 1 && folderPaths.some(path =>
    path.params.project.join('/') === params.project.join('/')
  );

  if (isFolder) {
    const folderPosts = getPostsByFolder(params.project[0]);
    return {
      props: {
        isFolder: true,
        folderName: params.project[0],
        posts: folderPosts,
        server
      }
    };
  }

  // Existing logic for individual posts
  const allPosts = getSortedPostsData();
  const currentPostIndex = allPosts.findIndex(post => post.id === params.project.join('/'));
  const currentPostData = await getPostData(params.project.join('/'));

  let nextPostData = null;
  if (currentPostIndex !== -1 && currentPostIndex < allPosts.length - 1) {
    const nextPost = allPosts[currentPostIndex + 1];
    nextPostData = await getPostData(nextPost.id);
  }

  return {
    props: {
      isFolder: false,
      currentPostData,
      nextPostData,
      server
    },
  };
}
