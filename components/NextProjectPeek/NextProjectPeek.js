import './NextProjectPeek.scss'
import Link from 'next/link'
import AccessibilityLabel from '../AccessibilityLabel/AccessibilityLabel'
import { ProjectArticleHeader } from '../ProjectArticleHeader/ProjectArticleHeader'

export default function NextProjectPeek({
    nextPostData
}) {
    return (
        <div className="next_project_peek">
            <hr />
            <div className="project_article_header_container">
                <ProjectArticleHeader peek={true} postData={nextPostData} autoPlayThumbnail={false} />
            </div>

            <Link href={`/work/${nextPostData.project}`} prefetch={false} className="project_access">
                <AccessibilityLabel role="text" as="span">
                    {nextPostData.title}
                </AccessibilityLabel>
            </Link>
        </div>
    )
}