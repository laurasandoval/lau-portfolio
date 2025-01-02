import './NextProjectPeek.scss'
import Link from 'next/link'
import AccessibilityLabel from '../AccessibilityLabel/AccessibilityLabel'
import { ProjectArticleHeader } from '../ProjectArticleHeader/ProjectArticleHeader'
import { useRef, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock'

export default function NextProjectPeek({
    nextPostData,
    headerDistance
}) {
    const [viewportDistance, setViewportDistance] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const router = useRouter();
    const headerRef = useRef(null);
    const timeoutRef = useRef(null);

    useEffect(() => {
        // Prefetch the next route
        router.prefetch(`/work/${nextPostData.project}`);

        // Reset everything when route change completes
        const handleRouteChangeComplete = () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
                timeoutRef.current = null;
            }
            setViewportDistance(0);
            setIsTransitioning(false);
            clearAllBodyScrollLocks();
        };

        const handleRouteChangeError = () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
                timeoutRef.current = null;
            }
            setIsTransitioning(false);
            clearAllBodyScrollLocks();
        };

        router.events.on('routeChangeComplete', handleRouteChangeComplete);
        router.events.on('routeChangeError', handleRouteChangeError);

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
            router.events.off('routeChangeComplete', handleRouteChangeComplete);
            router.events.off('routeChangeError', handleRouteChangeError);
            clearAllBodyScrollLocks();
        };
    }, [router, nextPostData.project]);

    const handleClick = (e) => {
        e.preventDefault();

        // If already transitioning, don't do anything
        if (isTransitioning) return;

        setIsTransitioning(true);

        // Calculate distance to viewport top
        if (headerRef.current) {
            const rect = headerRef.current.getBoundingClientRect();
            setViewportDistance(Math.round(rect.top));
        }

        // Lock scroll at current position
        disableBodyScroll(document.body, {
            reserveScrollBarGap: true,
        });

        // Start navigation after delay
        timeoutRef.current = setTimeout(async () => {
            try {
                await router.push(`/work/${nextPostData.project}`);
            } catch (error) {
                // Ignore AbortError as it's expected when navigation is cancelled
                if (error.name !== 'AbortError') {
                    console.error('Navigation error:', error);
                }
                // Cleanup regardless of error type
                setIsTransitioning(false);
                clearAllBodyScrollLocks();
            }
        }, 1200);
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