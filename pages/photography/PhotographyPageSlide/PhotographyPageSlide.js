import { ReactMarkdown } from 'react-markdown/lib/react-markdown'
import './PhotographyPageSlide.scss'
import { IconCalendar, IconLocation } from '@tabler/icons-react'
import { useState, useEffect, useRef } from 'react';

export default function PhotographyPageSlide({
    series
}) {
    const [currentImage, setCurrentImage] = useState(0);
    const imagesContainerRef = useRef(null);

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

    return (
        <div className="photography_page_slide">
            <div className="images_container">
                <div className="images" ref={imagesContainerRef} data-multiple-images={series.images.length > 1}>
                    {
                        series.images.map((image, index) => {
                            return (
                                <img
                                    key={index}
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
                                    <div className="page_dot" data-current={pageIndicatorIndex == currentImage} />
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