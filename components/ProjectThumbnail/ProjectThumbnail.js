import Image from 'next/image'
import Link from 'next/link'
import AccessibilityLabel from '../AccessibilityLabel/AccessibilityLabel'
import './ProjectThumbnail.scss'
import { useEffect, useRef, useState } from 'react';
import { IconPlayerPauseFilled, IconPlayerPlayFilled } from '@tabler/icons-react';

export function ProjectThumbnail({
    id,
    as,
    title,
    startYear,
    endYear,
    coverImage,
    hover,
    img_only,
    portrait,
    fadeIn,
    priority,
    sizes,
    autoplay,
    ...props
}) {
    const [isIntersecting, setIsIntersecting] = useState(false);
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [manuallyPaused, setManuallyPaused] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => setIsIntersecting(entry.isIntersecting),
            { threshold: 0.3 }
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
        if (videoRef.current != null) {
            if (autoplay == false) {
                videoRef.current.currentTime = 1;
                videoRef.current.play();
                videoRef.current.pause();
            } else if (isIntersecting && !manuallyPaused && autoplay != false) {
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
    }, [isIntersecting, manuallyPaused]);


    const _renderThumbnail = (coverImage, title, priority, sizes) => {
        const imageFormats = ["png", "jpg", "jpeg", "svg", "gif"]
        const videoFormats = ["mp4", "webm"]

        if (new RegExp(`[.](${imageFormats.join("|")})`).test(coverImage)) {
            return (
                <Image
                    src={coverImage}
                    alt={title}
                    fill
                    priority={priority ? priority : false}
                    sizes={sizes ? sizes : undefined}
                />
            )
        } else if (new RegExp(`[.](${videoFormats.join("|")})`).test(coverImage)) {
            return (
                <>
                    <video
                        ref={videoRef}
                        playsInline
                        muted
                        loop
                    >
                        <source
                            src={`${coverImage.replace(
                                ".mp4",
                                ".webm"
                            )}`}
                            type="video/webm"
                        />
                        <source
                            src={`${coverImage.replace(
                                ".webm",
                                ".mp4"
                            )}`}
                            type="video/mp4"
                        />
                    </video>
                    <button
                        onClick={() => {
                            const video = videoRef.current;
                            if (video.paused) {
                                video.play();
                                setIsPlaying(true);
                                setManuallyPaused(false);
                            } else {
                                video.pause();
                                setIsPlaying(false);
                                setManuallyPaused(true);
                            }
                        }}
                        className="playpause_button"
                        title={isPlaying ? "Pause" : "Play"}
                    >
                        {isPlaying ? <IconPlayerPauseFilled /> : <IconPlayerPlayFilled />}
                    </button>
                </>
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
            data-hover={hover ? "true" : "false"}
            data-img-only={img_only}
            data-portrait={portrait}
            data-fade-in={fadeIn}
        >
            {hover && (
                <Link href={`/design/${id}`} className="project_access">
                    <AccessibilityLabel role="text" as="span">
                        {title}
                    </AccessibilityLabel>
                </Link>
            )}
            <div className="project_artwork" aria-hidden="true">
                {_renderThumbnail(coverImage, title, priority, sizes)}
            </div>
            {!img_only && (
                <div className="project_info" aria-hidden={hover}>
                    <h3 className="title">{title}</h3>
                    <span className="date">
                        {startYear && endYear
                            ? `${startYear} — ${endYear}`
                            : startYear && endYear === null
                                ? `Since ${startYear}`
                                : endYear && startYear === null
                                    ? `Until ${endYear}`
                                    : null
                        }
                    </span>
                </div>
            )}
        </Tag>
    )
}