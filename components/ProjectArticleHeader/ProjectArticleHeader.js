import Balancer from 'react-wrap-balancer'
import { ProjectThumbnail } from '../ProjectThumbnail/ProjectThumbnail'
import './ProjectArticleHeader.scss'
import Link from 'next/link'
import { normalizeForUrl } from '@/lib/formatters'
import { forwardRef, useRef, useEffect } from 'react'

export const ProjectArticleHeader = forwardRef(({
    peek = false,
    postData,
    autoPlayThumbnail = true,
    fadeInUnderlines = false,
    onBasicInfoHeight,
    onThumbnailHeight
}, ref) => {
    const basicInfoRef = useRef(null);
    const thumbnailRef = useRef(null);

    useEffect(() => {
        if (basicInfoRef.current && onBasicInfoHeight) {
            const height = basicInfoRef.current.offsetHeight;
            onBasicInfoHeight(height);
        }
        if (thumbnailRef.current && onThumbnailHeight) {
            const height = thumbnailRef.current.offsetHeight;
            onThumbnailHeight(height);
        }
    }, [postData, onBasicInfoHeight, onThumbnailHeight]);

    return (
        <div
            ref={ref}
            className="project_article_header"
            data-peek={peek}
            data-fade-in-underlines={fadeInUnderlines}
        >
            <div ref={basicInfoRef} className="basic_info">
                <h2 className="title">
                    <Balancer>
                        {postData.title}
                    </Balancer>
                </h2>
                <p className="subtitle">
                    {postData.workType?.map((workType, i) => (
                        <Link
                            href={`/work/discipline/${normalizeForUrl(workType)}`}
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
            <div ref={thumbnailRef}>
                <ProjectThumbnail
                    title={postData.title}
                    asset={postData.coverImage}
                    autoplay={autoPlayThumbnail}
                    key={postData.coverImage}
                    img_only
                    placeholder={false}
                />
            </div>
            <hr />
        </div>
    )
})