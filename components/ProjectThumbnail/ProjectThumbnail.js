import Image from 'next/image'
import Link from 'next/link'
import AccessibilityLabel from '../AccessibilityLabel/AccessibilityLabel'
import './ProjectThumbnail.scss'
import { useEffect, useRef, useState } from 'react';
import { IconPlayerPauseFilled, IconPlayerPlayFilled } from '@tabler/icons-react';

export function ProjectThumbnail({
    as,
    title,
    subtitle,
    asset,
    url,
    img_only,
    portrait,
    fadeIn,
    priority,
    sizes,
    autoplay,
    collection,
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
    }, [videoRef, asset]);

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
    }, [isIntersecting, manuallyPaused, asset]);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.load();
        }
    }, [asset]);

    const _renderThumbnail = (asset, title, priority, sizes) => {
        const imageFormats = ["png", "jpg", "jpeg", "svg", "gif"]
        const videoFormats = ["mp4"]

        if (new RegExp(`[.](${imageFormats.join("|")})`).test(asset)) {
            return (
                <Image
                    src={asset}
                    alt={title}
                    fill
                    priority={priority ? priority : false}
                    sizes={sizes ? sizes : undefined}
                />
            )
        } else if (new RegExp(`[.](${videoFormats.join("|")})`).test(asset)) {
            return (
                <>
                    <video
                        ref={videoRef}
                        playsInline
                        muted
                        loop
                    >
                        <source
                            src={`${asset.replace(
                                ".mp4",
                                ".mp4"
                            )}`}
                            type="video/mp4"
                        />
                    </video>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
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

    const projectInfo = (
        <div className="project_info">
            <h3 className="title">{title}</h3>
            <span className="subtitle">{subtitle}</span>
        </div>
    )

    const content = (
        <>
            {collection && !img_only && projectInfo}
            <div className="project_artwork" aria-hidden="true">
                {_renderThumbnail(asset, title, priority, sizes)}
            </div>
            {!collection && !img_only && projectInfo}
        </>
    )

    return url ? (
        <Link href={url} className="project_thumbnail" data-name={title} data-img-only={img_only} data-portrait={portrait} data-fade-in={fadeIn} data-collection={collection}>
            <AccessibilityLabel role="text" as="span">
                {title}
            </AccessibilityLabel>
            {content}
        </Link>
    ) : (
        <Tag
            className="project_thumbnail"
            data-name={title}
            data-img-only={img_only}
            data-portrait={portrait}
            data-fade-in={fadeIn}
            data-collection={collection}
        >
            {content}
        </Tag>
    )
}