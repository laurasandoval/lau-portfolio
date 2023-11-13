import Balancer from 'react-wrap-balancer'
import { ProjectThumbnail } from '../ProjectThumbnail/ProjectThumbnail'
import './NextProjectPeek.scss'
import Link from 'next/link'
import AccessibilityLabel from '../AccessibilityLabel/AccessibilityLabel'

export default function NextProjectPeek({
    title,
    period,
    src,
    thumbnails,
}) {
    return (
        <div className="next_project_peek">
            <div className="divider">
                <hr />
                <h3 className="title">Next project</h3>
            </div>
            <div className="project_info">
                <div className="project_thumbnail_container">
                    <ProjectThumbnail
                        title={title}
                        period={period}
                        src={src}
                        img_only={true}
                        thumbnail={thumbnails[0]}
                        placeholder={true}
                        autoplay={false}
                        key={thumbnails[0]}
                    />
                </div>
                <div className="header">
                    <h2 className="title">
                        <Balancer>
                            {title}
                        </Balancer>
                    </h2>
                    <p className="period">{period}</p>
                </div>
            </div>

            <Link href={`/design/${src}`} prefetch={false} className="project_access">
                <AccessibilityLabel role="text" as="span">
                    {title}
                </AccessibilityLabel>
            </Link>
        </div>
    )
}