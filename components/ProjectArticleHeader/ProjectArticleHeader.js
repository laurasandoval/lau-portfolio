import Balancer from 'react-wrap-balancer'
import { ProjectThumbnail } from '../ProjectThumbnail/ProjectThumbnail'
import { formatYears, formatCategories } from '@/lib/formatters'
import './ProjectArticleHeader.scss'

export function ProjectArticleHeader({
    postData,
    autoPlayThumbnail = true,
}) {
    return (
        <div className="project_article_header">
            <div className="basic_info">
                <h2 className="title">
                    <Balancer>
                        {postData.title}
                    </Balancer>
                </h2>
                <p className="period">{formatCategories(postData.workType)}</p>
            </div>
            <p className="excerpt">
                <Balancer>
                    {postData.excerpt}
                </Balancer>
            </p>
            <ProjectThumbnail
                coverImage={postData.coverImage}
                autoplay={true}
                img_only
                placeholder={false}
            />
            <hr />
        </div>
    )
}