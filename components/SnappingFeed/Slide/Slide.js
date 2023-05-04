import { ReactMarkdown } from 'react-markdown/lib/react-markdown'
import './Slide.scss'
import { IconCalendar, IconChevronLeft, IconChevronRight, IconLocation } from '@tabler/icons-react'
import { useState, useEffect, useRef } from 'react';
import AccessibilityLabel from '@/components/AccessibilityLabel/AccessibilityLabel';
import Image from 'next/image';
import SlideVideo from './Video';

function SnappingFeedSlide({
    type,
    series,
    lazyLoad,
}) {
    const [currentAsset, setCurrentAsset] = useState(0);
    const assetsContainerRef = useRef(null);
    const pageDotRefs = useRef([]);

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
        <div className="snapping_feed_slide">
            <div className="assets_container">
                <div className="assets" ref={assetsContainerRef} data-multiple-assets={series.assets?.length > 1}>
                    {
                        series.assets.map((asset, assetIndex) => {
                            let content;
                            switch (type) {
                                case "image":
                                    content = (
                                        <Image
                                            key={assetIndex}
                                            className="asset img"
                                            src={`/assets/photography-work/${asset.src}`}
                                            alt={asset.alt}
                                            width={asset.width}
                                            height={asset.height}
                                            priority={assetIndex == 0 && !lazyLoad}
                                        />
                                    );
                                    break;
                                case "video":
                                    content = (
                                        <SlideVideo
                                            key={assetIndex}
                                            asset={asset}
                                        />
                                    );
                                    break;
                                default:
                                    content = (
                                        <p>Undefined asset type.</p>
                                    );
                            }
                            return (
                                <div
                                    className="asset_container"
                                    data-orientation={asset.width > asset.height ? "landscape" : "portrait"}
                                >
                                    {content}
                                </div>
                            );
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
                    <ReactMarkdown className="caption" children={series.caption} />
                }
                <div className="metadata_container">
                    <div className="metadata">
                        <IconCalendar size={14} />
                        <p>{series.period}</p>
                    </div>
                    <div className="metadata">
                        <IconLocation size={14} />
                        <p>{series.location}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

SnappingFeedSlide.Video = SlideVideo;

export default SnappingFeedSlide;