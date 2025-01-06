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
    const timeoutRef = useRef(null);
    const scrollPosRef = useRef(0);

    const cleanupScrollLock = () => {
        document.documentElement.classList.remove('scroll-locked');
        document.documentElement.style.removeProperty('--scroll-position');
        document.documentElement.style.removeProperty('--scrollbar-width');
    };

    useEffect(() => {
        // Prefetch the next route
        router.prefetch(`/work/${nextPostData.project}`);

        // Reset everything when route change starts
        const handleRouteChangeStart = () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
                timeoutRef.current = null;
            }
        };

        // Handle route change completion
        const handleRouteChangeComplete = () => {
            setViewportDistance(0);
            setIsTransitioning(false);
            cleanupScrollLock();
            // Force scroll to top after cleanup
            requestAnimationFrame(() => {
                window.scrollTo(0, 0);
            });
        };

        const handleRouteChangeError = () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
                timeoutRef.current = null;
            }
            setIsTransitioning(false);
            cleanupScrollLock();
            // Restore original scroll position if navigation fails
            window.scrollTo(0, scrollPosRef.current);
        };

        router.events.on('routeChangeStart', handleRouteChangeStart);
        router.events.on('routeChangeComplete', handleRouteChangeComplete);
        router.events.on('routeChangeError', handleRouteChangeError);

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
            router.events.off('routeChangeStart', handleRouteChangeStart);
            router.events.off('routeChangeComplete', handleRouteChangeComplete);
            router.events.off('routeChangeError', handleRouteChangeError);
            cleanupScrollLock();
            // Restore original scroll position on unmount
            window.scrollTo(0, scrollPosRef.current);
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

        // Calculate scrollbar width to prevent layout shifts
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
        document.documentElement.style.setProperty('--scrollbar-width', `${scrollbarWidth}px`);

        // Lock scroll while preserving position
        scrollPosRef.current = window.scrollY;
        document.documentElement.style.setProperty('--scroll-position', `${scrollPosRef.current}px`);
        document.documentElement.classList.add('scroll-locked');

        // Start navigation after delay
        timeoutRef.current = setTimeout(() => {
            router.push(`/work/${nextPostData.project}`)
                .catch((error) => {
                    // Ignore AbortError as it's expected when navigation is cancelled
                    if (error.name !== 'AbortError') {
                        console.error('Navigation error:', error);
                    }
                })
                .finally(() => {
                    // Always ensure we cleanup if navigation fails
                    if (!router.pathname.includes(nextPostData.project)) {
                        setIsTransitioning(false);
                        cleanupScrollLock();
                        window.scrollTo(0, scrollPosRef.current);
                    }
                });
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