import Balancer from 'react-wrap-balancer'
import { ProjectThumbnail } from '../ProjectThumbnail/ProjectThumbnail'
import './ProjectArticleHeader.scss'
import Link from 'next/link'

export function ProjectArticleHeader({
    peek = false,
    postData,
    autoPlayThumbnail = true,
}) {
    return (
        <div className="project_article_header" data-peek={peek}>
            <div className="basic_info">
                <h2 className="title">
                    <Balancer>
                        {postData.title}
                    </Balancer>
                </h2>
                <p className="subtitle">
                    {postData.workType?.map((workType, i) => (
                        <Link
                            href={`/work/discipline/${workType.toLowerCase().replace(/[&]/g, '').replace(/\s+/g, '-')}`}
                            key={i}
                        >
                            {workType}
                        </Link>
                    )).reduce((prev, curr) => [prev, ', ', curr])}
                </p>
            </div>
            <p className="excerpt">
                <Balancer>
                    {postData.excerpt}
                </Balancer>
            </p>
            <ProjectThumbnail
                coverImage={postData.coverImage}
                autoplay={autoPlayThumbnail}
                img_only
                placeholder={false}
            />
            <hr />
        </div>
    )
}