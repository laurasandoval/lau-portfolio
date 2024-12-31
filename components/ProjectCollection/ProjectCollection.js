import { ProjectThumbnail } from '@/components/ProjectThumbnail/ProjectThumbnail'
import GlobalHeader from '@/components/GlobalHeader/GlobalHeader'
import ProjectsGrid from '@/components/ProjectsGrid/ProjectsGrid'
import GlobalFooter from '@/components/GlobalFooter/GlobalFooter'
import { NextSeo } from 'next-seo'
import { formatYears } from '@/lib/formatters'
import './ProjectCollection.scss'

export default function ProjectCollection({
    title,
    posts,
    server,
    subtitle,
    description = "Digital Product Designer & Engineer. Featured works include projects for Uber, Uber Eats, Cornershop, among others."
}) {
    const _renderThumbnail = (project, index, priority) => {
        return (
            <ProjectThumbnail
                {...project}
                title={project.title}
                subtitle={project.subtitle || formatYears(project.startYear, project.endYear)}
                asset={project.coverImage}
                url={`/work/${project.id}`}
                as="article"
                key={index}
                fadeIn={false}
                priority={priority}
            />
        )
    }

    return (
        <>
            <NextSeo
                title={`${title} — Laura Sandoval`}
                description={description}
                openGraph={{
                    title: `${title} — Laura Sandoval`,
                    description: description,
                    images: posts.length > 0 ? [
                        {
                            url: `${server}${posts[0].ogImage}`,
                        }
                    ] : [],
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

            <div className="project_collection_page">
                <div className="header">
                    <div className="basic_info">
                        <h2 className="title">{title}</h2>
                        <h2 className="subtitle">{subtitle || `${posts.length} ${posts.length === 1 ? "project" : "projects"}`}</h2>
                    </div>
                </div>

                <ProjectsGrid showAll>
                    {posts.map((project, index) => {
                        return _renderThumbnail(project, index, (index == 0 || index == 1))
                    })}
                </ProjectsGrid>
            </div>

            <GlobalFooter />
        </>
    )
} 