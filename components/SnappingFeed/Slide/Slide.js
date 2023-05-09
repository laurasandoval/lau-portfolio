import { ReactMarkdown } from 'react-markdown/lib/react-markdown'
import './Slide.scss'
import { IconCalendar, IconChevronLeft, IconChevronRight, IconLocation } from '@tabler/icons-react'
import { useState, useEffect, useRef } from 'react';
import AccessibilityLabel from '@/components/AccessibilityLabel/AccessibilityLabel';
import SlideImage from './Image';
import SlideVideo from './Video';
import { Balancer } from 'react-wrap-balancer';

function SnappingFeedSlide({
    type,
    series,
    lazyLoad,
    allVideosAreMuted,
    setAllVideosAreMuted,
}) {
    const [currentAsset, setCurrentAsset] = useState(0);
    const assetsContainerRef = useRef(null);
    const pageDotRefs = useRef([]);
    const [isIntersecting, setIsIntersecting] = useState(false);
    const slideRef = useRef(null);

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
        const assetsContainer = assetsContainerRef.current;
        const assetsContainerPaddingLeft = 40;

        const handleScroll = () => {
            const containerWidth = assetsContainer.offsetWidth;

            const assets = assetsContainer.querySelectorAll('.asset');
            let i;
            for (i = 0; i < assets.length; i++) {
                const assetLeft = assets[i].offsetLeft + 40;
                let assetWidth;

                if (i === 0) {
                    assetWidth = assets[i].offsetWidth + assetsContainerPaddingLeft
                } else {
                    assetWidth = assets[i].offsetWidth + 20
                }

                if (assetLeft <= (assetsContainer.scrollLeft - assetsContainerPaddingLeft) + containerWidth / 2 &&
                    assetLeft + assetWidth > (assetsContainer.scrollLeft - assetsContainerPaddingLeft) + containerWidth / 2) {
                    setCurrentAsset(i);
                    break;
                }
            }
        };
        assetsContainer.addEventListener('scroll', handleScroll);
        return () => {
            assetsContainer.removeEventListener('scroll', handleScroll);
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

    return (
        <div
            className="snapping_feed_slide"
            ref={slideRef}
            data-current={isIntersecting}
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
                                    <Balancer>
                                        <p>
                                            {props.children}
                                        </p>
                                    </Balancer>
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