import { ReactMarkdown } from 'react-markdown/lib/react-markdown'
import './PhotographyPageSlide.scss'
import { IconCalendar, IconLocation } from '@tabler/icons-react'
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
        const handleScroll = () => {
            const containerWidth = imagesContainer.offsetWidth;
            const images = imagesContainer.querySelectorAll('.image');
            let i;
            for (i = 0; i < images.length; i++) {
                const imageLeft = images[i].offsetLeft;
                const imageWidth = images[i].offsetWidth;
                if (imageLeft <= imagesContainer.scrollLeft + containerWidth / 2 &&
                    imageLeft + imageWidth > imagesContainer.scrollLeft + containerWidth / 2) {
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