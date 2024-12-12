import './folder-page.scss'
import GlobalHeader from '@/components/GlobalHeader/GlobalHeader'
import ProjectsGrid from '@/components/ProjectsGrid/ProjectsGrid'
import { ProjectThumbnail } from '@/components/ProjectThumbnail/ProjectThumbnail'
import { NextSeo } from 'next-seo'
import GlobalFooter from '@/components/GlobalFooter/GlobalFooter'
import { getSortedPostsData } from '../../lib/posts'

export default function FolderPage({ folderName, posts, server }) {
  const _renderThumbnail = (project, index, featured, priority) => {
    return (
      <ProjectThumbnail
        {...project}
        id={project.id}
        as="article"
        hover
        key={index}
        portrait={featured}
        fadeIn={false}
        priority={priority}
      />
    )
  }

  const _normalizedFolderName = () => {
    const cleanedFolderName = folderName.replaceAll("-", " ");
    const words = cleanedFolderName.split(" ");

    for (let i = 0; i < words.length; i++) {
      words[i] = words[i][0].toUpperCase() + words[i].substr(1);
    }

    return words.join(" ");
  }

  const _folderDisplayName = () => {
    if (posts[0].client === undefined) {
      return _normalizedFolderName()
    } else {
      return posts[0].client
    }
  }

  return (
    <>
      <NextSeo
        title={`${_folderDisplayName()}  — Laura Sandoval`}
        description="Digital Product Designer & Engineer. Featured works include projects for Uber, Uber Eats, Cornershop, among others."
        openGraph={{
          title: `${_folderDisplayName()}  — Laura Sandoval`,
          description: "Digital Product Designer & Engineer. Featured works include projects for Uber, Uber Eats, Cornershop, among others.",
          images: [
            {
              url: `${server}${posts[0].ogImage}`,
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

      <GlobalHeader sticky fadeIn={false} />

      <div className="folder_page">
        <div className="folder_name_header">
          <div className="basic_info">
            <h2 className="title">{_folderDisplayName()}</h2>
            <h2 className="subtitle">{`${posts.length} projects`}</h2>
          </div>
        </div>

        <ProjectsGrid showAll>
          {posts.map((project, index) => {
            return _renderThumbnail(project, index, true, (index == 0 || index == 1))
          })}
        </ProjectsGrid>
      </div>

      <GlobalFooter />
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