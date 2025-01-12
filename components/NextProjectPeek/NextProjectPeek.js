import './NextProjectPeek.scss'
import Link from 'next/link'
import AccessibilityLabel from '../AccessibilityLabel/AccessibilityLabel'
import { ProjectArticleHeader } from '../ProjectArticleHeader/ProjectArticleHeader'
import { useRef, useState, useEffect } from 'react'
import { useRouter } from 'next/router'

export default function NextProjectPeek({
    nextPostData,
    headerDistance = 0,
    isTransitioning,
    setIsTransitioning,
    fadeIn = false,
    fadeInDelay = 0.5
}) {
    const [viewportDistance, setViewportDistance] = useState(0);
    const [basicInfoHeight, setBasicInfoHeight] = useState(0);
    const [thumbnailHeight, setThumbnailHeight] = useState(0);
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
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
            window.scrollTo(0, scrollPosRef.current);
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

    const handleClick = (e) => {
        e.preventDefault();
        if (isTransitioning) return;

        // First calculate viewport distance
        let calculatedViewportDistance = 0;
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

            calculatedViewportDistance = Math.round(rect.top - marginCompensation);
        }

        // Calculate credits position
        const designProjectArticleBody = document.querySelector('.design_project_article_body');
        if (designProjectArticleBody) {
            const designProjectArticleBodyRect = designProjectArticleBody.getBoundingClientRect();
            const absoluteCreditsTop = designProjectArticleBodyRect.top + window.scrollY;

            // Check if credits are in sticky state
            const creditsElement = designProjectArticleBody.querySelector('.credits');
            const creditsRect = creditsElement.getBoundingClientRect();
            const relativeCreditsTop = creditsRect.top - 40;

            document.documentElement.style.setProperty('--credits-absolute-distance', `${Math.round(absoluteCreditsTop)}px`);
            document.documentElement.style.setProperty('--credits-relative-distance', `${Math.round(relativeCreditsTop)}px`);
        }

        // Set viewport distance before any transitions
        setViewportDistance(calculatedViewportDistance);

        // Now handle scroll locking
        scrollPosRef.current = window.scrollY;
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
        document.documentElement.style.setProperty('--scrollbar-width', `${scrollbarWidth}px`);
        document.documentElement.style.setProperty('--scroll-position', `${scrollPosRef.current}px`);
        document.documentElement.classList.add('scroll-locked');
        document.body.style.position = 'fixed';
        document.body.style.top = `-${scrollPosRef.current}px`;
        document.body.style.width = '100%';

        // Finally set transition state and trigger navigation
        setIsTransitioning(true);

        timeoutRef.current = setTimeout(() => {
            router.push(`/work/${nextPostData.project}?ref=peek`)
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
            data-fade-in={fadeIn}
            style={{
                '--header-distance': `${headerDistance}px`,
                '--viewport-distance': `${viewportDistance}px`,
                '--fade-in-delay': `${fadeInDelay}s`,
                '--basic-info-computed-height': `${basicInfoHeight}px`,
                '--thumbnail-computed-height': `${thumbnailHeight}px`
            }}
        >
            <hr />
            <div className="project_article_header_container">
                <ProjectArticleHeader
                    ref={headerRef}
                    peek={true}
                    postData={nextPostData}
                    autoPlayThumbnail={false}
                    onBasicInfoHeight={setBasicInfoHeight}
                    onThumbnailHeight={setThumbnailHeight}
                />
            </div>

            <Link href={`/work/${nextPostData.project}?ref=peek`} prefetch={false} className="project_access" onClick={handleClick}>
                <AccessibilityLabel role="text" as="span">
                    {nextPostData.title}
                </AccessibilityLabel>
            </Link>
        </div>
    )
}