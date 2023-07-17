import { ReactMarkdown } from 'react-markdown/lib/react-markdown'
import './Slide.scss'
import { IconCalendar, IconChevronLeft, IconChevronRight, IconLocation } from '@tabler/icons-react'
import { useState, useEffect, useRef } from 'react';
import AccessibilityLabel from '@/components/AccessibilityLabel/AccessibilityLabel';
import SlideImage from './Image';
import SlideVideo from './Video';
import { useRouter } from 'next/router';
import { throttle } from 'lodash';

function SnappingFeedSlide({
    type,
    series,
    lazyLoad,
    allVideosAreMuted,
    setAllVideosAreMuted,
    slideIndex,
}) {
    const [currentAsset, setCurrentAsset] = useState(0);
    const [assetsContainerComputedHeight, setAssetsContainerComputedHeight] = useState(0);
    const assetsContainerRef = useRef(null);
    const pageDotRefs = useRef([]);
    const [isIntersecting, setIsIntersecting] = useState(false);
    const slideRef = useRef(null);
    const router = useRouter();

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => setIsIntersecting(entry.isIntersecting),
            { threshold: 0.5 }
        );

        if (slideRef.current) {
            observer.observe(slideRef.current);
        }

        return () => {
            if (slideRef.current) {
                observer.unobserve(slideRef.current);
            }
        };
    }, [slideRef]);

    useEffect(() => {
        let observer;
        const handleIntersect = (entries, obs) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setCurrentAsset(parseInt(entry.target.getAttribute('data-index'), 10));
                }
            });
        };
        const options = {
            root: assetsContainerRef.current,
            rootMargin: '0px',
            threshold: 0.5,
        };

        observer = new IntersectionObserver(handleIntersect, options);
        const assets = assetsContainerRef.current.querySelectorAll('.asset_container');

        assets.forEach((asset, index) => {
            asset.setAttribute('data-index', index);
            observer.observe(asset);
        });

        return () => {
            if (observer) {
                assets.forEach((asset) => {
                    observer.unobserve(asset);
                });
            }
        };
    }, []);


    const scrollToAsset = (assetIndex) => {
        const assetsContainer = assetsContainerRef.current;
        const assetWidth = assetsContainer.querySelector('.asset').offsetWidth;
        assetsContainer.scroll({
            left: assetWidth * assetIndex,
            behavior: 'smooth'
        });
    };

    useEffect(() => {
        if (isIntersecting && slideRef.current) {
            const slideId = slideRef.current.id;
            if (slideId) {
                const url = new URL(window.location.href);
                url.searchParams.set("slide", slideId);
                window.history.replaceState({}, "", url.toString());
            }
        }
    }, [isIntersecting]);

    useEffect(() => {
        const slideToScroll = router.query.slide;
        if (slideToScroll) {
            const slideElement = document.getElementById(slideToScroll);
            if (slideElement) {
                slideElement.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });
            }
        }
    }, [router.query.slide]);

    useEffect(() => {
        const getHeights = throttle(() => {
            const assetsContainerClientHeight = assetsContainerRef.current.clientHeight;
            const assetsContainerComputedStyles = window.getComputedStyle(assetsContainerRef.current);
            const assetsContainerPaddingBottom = parseInt(assetsContainerComputedStyles.getPropertyValue('padding-bottom'), 10);
            const assetsContainerComputedHeight = assetsContainerClientHeight - assetsContainerPaddingBottom;
            setAssetsContainerComputedHeight(assetsContainerComputedHeight);
        }, 200);

        getHeights();

        window.addEventListener('resize', getHeights);

        return () => {
            window.removeEventListener('resize', getHeights);
            getHeights.cancel(); // cancel the throttle when component unmounts
        };
    }, []);

    return (
        <div
            className="snapping_feed_slide"
            ref={slideRef}
            data-current={isIntersecting}
            id={`${slideIndex}`}
        >
            <div className="assets_container" data-type={type}>
                <div className="assets" ref={assetsContainerRef} data-multiple-assets={series.assets?.length > 1}>
                    {
                        series.assets.map((asset, assetIndex) => {
                            switch (type) {
                                case "image":
                                    return (
                                        <SlideImage
                                            key={assetIndex}
                                            asset={asset}
                                            current={isIntersecting}
                                            priority={assetIndex == 0 && !lazyLoad}
                                            assetsContainerComputedHeight={assetsContainerComputedHeight}
                                        />
                                    );
                                    break;
                                case "video":
                                    return (
                                        <SlideVideo
                                            key={assetIndex}
                                            asset={asset}
                                            current={isIntersecting}
                                            allVideosAreMuted={allVideosAreMuted}
                                            setAllVideosAreMuted={setAllVideosAreMuted}
                                            assetsContainerComputedHeight={assetsContainerComputedHeight}
                                        />
                                    );
                                    break;
                                default:
                                    return (
                                        <p key={assetIndex}>Undefined asset type.</p>
                                    );
                            }
                        })
                    }
                </div>

                <div className="slider_arrows_container">
                    <button
                        className="arrow left"
                        onClick={() => scrollToAsset(currentAsset - 1)}
                        data-visible={currentAsset > 0}
                    >
                        <IconChevronLeft />
                        <AccessibilityLabel>Go to previous page</AccessibilityLabel>
                    </button>
                    <button
                        className="arrow right"
                        onClick={() => scrollToAsset(currentAsset + 1)}
                        data-visible={currentAsset < series.assets.length - 1}
                    >
                        <IconChevronRight />
                        <AccessibilityLabel>Go to next page</AccessibilityLabel>
                    </button>
                </div>
            </div>
            <div className="caption_container">
                {
                    series.assets.length > 1 &&
                    <div className="page_indicator">
                        {
                            series.assets.map((_, pageIndicatorIndex) => {
                                return (
                                    <button
                                        key={pageIndicatorIndex}
                                        className="page_dot"
                                        ref={ref => pageDotRefs.current[pageIndicatorIndex] = ref}
                                        data-current={pageIndicatorIndex == currentAsset}
                                        onClick={() => scrollToAsset(pageIndicatorIndex)}
                                    >
                                        <AccessibilityLabel>{`Go to page ${pageIndicatorIndex + 1}`}</AccessibilityLabel>
                                    </button>
                                )
                            })
                        }
                    </div>
                }
                {
                    series.caption &&
                    <ReactMarkdown
                        className="caption"
                        children={series.caption}
                        components={{
                            p: props => {
                                return (
                                    <p>{props.children}</p>
                                )
                            }
                        }}
                    />
                }
                <div className="metadata_container">
                    <div className="metadata">
                        <IconCalendar size={14} />
                        <p>{series.period}</p>
                    </div>
                    {
                        series.location &&
                        <div className="metadata">
                            <IconLocation size={14} />
                            <p>{series.location}</p>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

SnappingFeedSlide.Image = SlideImage;
SnappingFeedSlide.Video = SlideVideo;

export default SnappingFeedSlide;