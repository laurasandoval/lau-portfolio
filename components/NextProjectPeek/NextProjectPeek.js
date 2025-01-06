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

    useEffect(() => {
        // Prefetch the next route
        router.prefetch(`/work/${nextPostData.project}`);

        const cleanup = () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
                timeoutRef.current = null;
            }
            document.documentElement.classList.remove('scroll-locked');
            document.documentElement.style.removeProperty('--scroll-position');
            document.documentElement.style.removeProperty('--scrollbar-width');
        };

        // Handle route change completion
        const handleRouteChangeComplete = () => {
            cleanup();
            setViewportDistance(0);
            setIsTransitioning(false);
            requestAnimationFrame(() => {
                window.scrollTo(0, 0);
            });
        };

        const handleRouteChangeError = () => {
            cleanup();
            setIsTransitioning(false);
            window.scrollTo(0, scrollPosRef.current);
        };

        router.events.on('routeChangeComplete', handleRouteChangeComplete);
        router.events.on('routeChangeError', handleRouteChangeError);

        return () => {
            cleanup();
            router.events.off('routeChangeComplete', handleRouteChangeComplete);
            router.events.off('routeChangeError', handleRouteChangeError);
            window.scrollTo(0, scrollPosRef.current);
        };
    }, [router, nextPostData.project]);

    const getComputedValue = (element, property) => {
        const computedStyle = window.getComputedStyle(element);
        return parseInt(computedStyle.getPropertyValue(property), 10) || 0;
    };

    const handleClick = (e) => {
        e.preventDefault();
        if (isTransitioning) return;

        setIsTransitioning(true);

        // Calculate distance to viewport top
        if (headerRef.current) {
            const rect = headerRef.current.getBoundingClientRect();

            // Only apply margin compensation on iOS Safari
            const isIOSSafari = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
            let marginCompensation = 0;

            if (isIOSSafari) {
                const containerComputedStyle = window.getComputedStyle(headerRef.current.parentElement);
                const cssMarginTop = parseInt(containerComputedStyle.getPropertyValue('--margin-top'), 10) || 0;
                const computedMarginTop = parseInt(containerComputedStyle.marginTop, 10) || 0;
                marginCompensation = cssMarginTop - computedMarginTop;
            }

            setViewportDistance(Math.round(rect.top - marginCompensation));
        }

        // Lock scroll while preserving position
        scrollPosRef.current = window.scrollY;
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
        document.documentElement.style.setProperty('--scrollbar-width', `${scrollbarWidth}px`);
        document.documentElement.style.setProperty('--scroll-position', `${scrollPosRef.current}px`);

        // Calculate and preserve credits position
        const credits = document.querySelector('.design_project_article_body');
        if (credits) {
            const creditsRect = credits.getBoundingClientRect();
            const absoluteCreditsTop = creditsRect.top + window.scrollY;

            // Check if credits are in sticky state
            const creditsElement = credits.querySelector('.credits');
            if (creditsElement) {
                const creditsRect = creditsElement.getBoundingClientRect();
                const isSticky = Math.abs(creditsRect.top - 40) < 1;

                if (isSticky) {
                    document.documentElement.style.setProperty('--credits-distance', `${absoluteCreditsTop}px`);
                    document.documentElement.setAttribute('data-credits-sticky', 'true');
                } else {
                    document.documentElement.removeAttribute('data-credits-sticky');
                }
            }
        }

        document.documentElement.classList.add('scroll-locked');

        // Start navigation after delay
        timeoutRef.current = setTimeout(() => {
            router.push(`/work/${nextPostData.project}`)
                .catch((error) => {
                    if (error.name !== 'AbortError') {
                        console.error('Navigation error:', error);
                    }
                });
        }, 1400);
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