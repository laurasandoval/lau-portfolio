import Balancer from 'react-wrap-balancer'
import { ProjectThumbnail } from '../ProjectThumbnail/ProjectThumbnail'
import './NextProjectPeek.scss'
import Link from 'next/link'
import AccessibilityLabel from '../AccessibilityLabel/AccessibilityLabel'
import { useEffect, useRef, useState } from 'react'
import { throttle } from 'lodash'

export default function NextProjectPeek({
    id,
    title,
    excerpt,
    categories,
    startYear,
    endYear,
    coverImage,
}) {
    const projectInfoHeaderRef = useRef(null);
    const [projectInfoHeaderHeight, setProjectInfoHeaderHeight] = useState(0);

    useEffect(() => {
        const getProjectInfoHeaderHeight = throttle(() => {
            setProjectInfoHeaderHeight(projectInfoHeaderRef.current?.clientHeight);
        }, 200);

        getProjectInfoHeaderHeight();

        window.addEventListener('resize', getProjectInfoHeaderHeight);

        return () => {
            window.removeEventListener('resize', getProjectInfoHeaderHeight);
            getProjectInfoHeaderHeight.cancel();
        };
    }, [title]);

    return (
        <div
            className="next_project_peek"
            style={{
                "--project-info-header-computed-height": `${projectInfoHeaderHeight}px`
            }}
        >
            <hr />
            <div className="project_info">
                <div className="project_thumbnail_container">
                    <ProjectThumbnail
                        id={id}
                        title={title}
                        startYear={startYear}
                        endYear={endYear}
                        img_only={true}
                        coverImage={coverImage}
                        placeholder={true}
                        autoplay={false}
                    />
                </div>
                <div
                    className="header"
                    ref={projectInfoHeaderRef}
                >
                    <h2 className="title">
                        <Balancer>
                            {title}
                        </Balancer>
                    </h2>
                    <p className="period">{startYear}</p>
                </div>
            </div>

            <Link href={`/design/${id}`} prefetch={false} className="project_access">
                <AccessibilityLabel role="text" as="span">
                    {title}
                </AccessibilityLabel>
            </Link>
        </div>
    )
}