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
        fadeIn
        priority={priority}
      />
    )
  }

  const _normalizedFolderName = (folderName) => {
    const cleanedFolderName = folderName.replace("-", " ");
    const words = cleanedFolderName.split(" ");

    for (let i = 0; i < words.length; i++) {
      words[i] = words[i][0].toUpperCase() + words[i].substr(1);
    }

    return words.join(" ");
  }

  return (
    <>
      <NextSeo
        title={`${_normalizedFolderName(folderName)}  — Laura Sandoval`}
        description="Digital Product Designer & Engineer. Featured works include projects for Uber, Uber Eats, Cornershop, among others."
        openGraph={{
          title: `${_normalizedFolderName(folderName)}  — Laura Sandoval`,
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

      <GlobalHeader sticky />

      <h2>{_normalizedFolderName(folderName)}</h2>

      <ProjectsGrid featured>
        {posts.map((project, index) => {
          return _renderThumbnail(project, index, true, (index == 0 || index == 1))
        })}
      </ProjectsGrid>

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