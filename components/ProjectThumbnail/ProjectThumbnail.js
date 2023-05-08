import Image from 'next/image'
import Link from 'next/link'
import AccessibilityLabel from '../AccessibilityLabel/AccessibilityLabel'
import './ProjectThumbnail.scss'
import { useEffect, useRef, useState } from 'react';

export function ProjectThumbnail({
    as,
    title,
    year,
    src,
    thumbnail,
    thumbnails,
    hover,
    img_only,
    autoplay,
    portrait,
    fadeIn,
    priority,
    sizes,
}) {
    const [isIntersecting, setIsIntersecting] = useState(false);
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => setIsIntersecting(entry.isIntersecting),
            { threshold: 0.1 }
        );

        if (videoRef.current) {
            observer.observe(videoRef.current);
        }

        return () => {
            if (videoRef.current) {
                observer.unobserve(videoRef.current);
            }
        };
    }, [videoRef]);

    useEffect(() => {
        if (videoRef != null) {
            if (isIntersecting) {
                const playPromise = videoRef.current.play();
                if (playPromise !== undefined) {
                    playPromise.then(() => {
                        setIsPlaying(true);
                    }).catch((error) => {
                        setIsPlaying(false);
                        console.error("Error attempting to auto-play video: ", error);
                    });
                }
            } else {
                videoRef.current?.pause();
                setIsPlaying(false);
            }
        }
    }, [isIntersecting]);

    const _renderThumbnail = (thumbnail, src, title, autoplay, priority, sizes) => {
        const imageFormats = ["png", "jpg", "jpeg", "svg", "gif"]
        const videoFormats = ["mp4", "webm"]

        if (new RegExp(`[.](${imageFormats.join("|")})`).test(thumbnail)) {
            return (
                <Image
                    src={`/assets/design-work/${src}/${thumbnail}`}
                    alt={title}
                    fill
                    priority={priority ? priority : false}
                    sizes={sizes ? sizes : undefined}
                />
            )
        } else if (new RegExp(`[.](${videoFormats.join("|")})`).test(thumbnail)) {
            return (
                <video
                    ref={videoRef}
                    playsInline
                    muted
                    autoPlay={autoplay}
                    loop
                >
                    <source
                        src={`/assets/design-work/${src}/${thumbnail.replace(
                            ".mp4",
                            ".webm"
                        )}`}
                        type="video/webm"
                    />
                    <source
                        src={`/assets/design-work/${src}/${thumbnail.replace(
                            ".webm",
                            ".mp4"
                        )}`}
                        type="video/mp4"
                    />
                </video>
            )
        } else {
            return (
                <div>
                    <span>Error</span>
                </div>
            )
        }
    }

    const Tag = as ? as : "div"

    return (
        <Tag
            className="project_thumbnail"
            data-name={title}
            data-hover={hover}
            data-img-only={img_only}
            data-portrait={portrait}
            data-fade-in={fadeIn}
        >
            {hover && (
                <Link href={`/design/${src}`} className="project_access">
                    <AccessibilityLabel role="text" as="span">
                        {title}
                    </AccessibilityLabel>
                </Link>
            )}
            <div className="project_artwork" aria-hidden="true">
                {_renderThumbnail(thumbnail ? thumbnail : thumbnails[0], src, title, priority, sizes)}
            </div>
            {!img_only && (
                <div className="project_info" aria-hidden={hover}>
                    <h3 className="title">{title}</h3>
                    <span className="date">{year}</span>
                </div>
            )}
        </Tag>
    )
}