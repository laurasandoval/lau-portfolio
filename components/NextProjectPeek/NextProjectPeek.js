import './NextProjectPeek.scss'
import Link from 'next/link'
import AccessibilityLabel from '../AccessibilityLabel/AccessibilityLabel'
import { ProjectArticleHeader } from '../ProjectArticleHeader/ProjectArticleHeader'
import { useRef, useState, useEffect } from 'react'
import { useRouter } from 'next/router'

export default function NextProjectPeek({
    nextPostData,
    headerDistance
}) {
    const [viewportDistance, setViewportDistance] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const router = useRouter();
    const headerRef = useRef(null);
    const transitionTimeoutRef = useRef(null);
    const hasRouteFinished = useRef(false);

    useEffect(() => {
        // Reset everything when route change completes
        const handleRouteChangeComplete = () => {
            setViewportDistance(0);
            setIsTransitioning(false);
        };

        router.events.on('routeChangeComplete', handleRouteChangeComplete);

        return () => {
            router.events.off('routeChangeComplete', handleRouteChangeComplete);
        };
    }, [router]);

    const handleClick = (e) => {
        e.preventDefault();
        setIsTransitioning(true);

        // Calculate distance to viewport top
        if (headerRef.current) {
            const rect = headerRef.current.getBoundingClientRect();
            setViewportDistance(Math.round(rect.top));
        }

        // Start navigation after delay
        setTimeout(() => {
            router.push(`/work/${nextPostData.project}`);
        }, 3000);
    };

    return (
        <div
            className="next_project_peek"
            data-transitioning={isTransitioning ? "true" : "false"}
            style={{
                '--header-distance': `${headerDistance}px`,
                '--viewport-distance': `${viewportDistance}px`
            }}
        >
            <hr />
            <div className="project_article_header_container">
                <ProjectArticleHeader ref={headerRef} peek={true} postData={nextPostData} autoPlayThumbnail={false} />
            </div>

            <Link href={`/work/${nextPostData.project}`} prefetch={false} className="project_access" onClick={handleClick}>
                <AccessibilityLabel role="text" as="span">
                    {nextPostData.title}
                </AccessibilityLabel>
            </Link>
        </div>
    )
}