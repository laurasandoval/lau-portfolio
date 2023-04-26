import { ReactMarkdown } from 'react-markdown/lib/react-markdown'
import './PhotographyPageSlide.scss'
import { IconCalendar, IconChevronLeft, IconChevronRight, IconLocation } from '@tabler/icons-react'
import { useState, useEffect, useRef } from 'react';
import AccessibilityLabel from '@/components/AccessibilityLabel/AccessibilityLabel';

export function PhotographyPageSlide({
    series,
}) {
    const [currentImage, setCurrentImage] = useState(0);
    const imagesContainerRef = useRef(null);
    const pageDotRefs = useRef([]);

    useEffect(() => {
        const imagesContainer = imagesContainerRef.current;
        const imagesContainerPaddingLeft = 40;

        const handleScroll = () => {
            const containerWidth = imagesContainer.offsetWidth;

            console.log(containerWidth);

            const images = imagesContainer.querySelectorAll('.image');
            let i;
            for (i = 0; i < images.length; i++) {
                const imageLeft = images[i].offsetLeft + 40;
                let imageWidth;

                if (i === 0) {
                    imageWidth = images[i].offsetWidth + imagesContainerPaddingLeft
                } else {
                    imageWidth = images[i].offsetWidth + 20
                }

                if (imageLeft <= (imagesContainer.scrollLeft - imagesContainerPaddingLeft) + containerWidth / 2 &&
                    imageLeft + imageWidth > (imagesContainer.scrollLeft - imagesContainerPaddingLeft) + containerWidth / 2) {
                    setCurrentImage(i);
                    break;
                }
            }
        };
        imagesContainer.addEventListener('scroll', handleScroll);
        return () => {
            imagesContainer.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const scrollToImage = (imageIndex) => {
        const imagesContainer = imagesContainerRef.current;
        const imageWidth = imagesContainer.querySelector('.image').offsetWidth;
        imagesContainer.scroll({
            left: imageWidth * imageIndex,
            behavior: 'smooth'
        });
    };

    return (
        <div className="photography_page_slide">
            <div className="images_container">
                <div className="images" ref={imagesContainerRef} data-multiple-images={series.images?.length > 1}>
                    {
                        series.images.map((image, imageIndex) => {
                            return (
                                <img
                                    key={imageIndex}
                                    className="image"
                                    src={`/assets/photography-work/${image.src}`}
                                    alt={image.alt}
                                />
                            )
                        })
                    }
                </div>
                <div className="slider_arrows_container">
                    <button
                        className="arrow left"
                        onClick={() => scrollToImage(currentImage - 1)}
                        data-visible={currentImage > 0}
                    >
                        <IconChevronLeft />
                        <AccessibilityLabel>Go to previous page</AccessibilityLabel>
                    </button>
                    <button
                        className="arrow right"
                        onClick={() => scrollToImage(currentImage + 1)}
                        data-visible={currentImage < series.images.length - 1}
                    >
                        <IconChevronRight />
                        <AccessibilityLabel>Go to next page</AccessibilityLabel>
                    </button>
                </div>
            </div>
            <div className="caption_container">
                {
                    series.images.length > 1 &&
                    <div className="page_indicator">
                        {
                            series.images.map((_, pageIndicatorIndex) => {
                                return (
                                    <button
                                        key={pageIndicatorIndex}
                                        className="page_dot"
                                        ref={ref => pageDotRefs.current[pageIndicatorIndex] = ref}
                                        data-current={pageIndicatorIndex == currentImage}
                                        onClick={() => scrollToImage(pageIndicatorIndex)}
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