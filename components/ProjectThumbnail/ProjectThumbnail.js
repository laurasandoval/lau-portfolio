import Image from 'next/image'
import Link from 'next/link'
import AccessibilityLabel from '../AccessibilityLabel/AccessibilityLabel'
import './ProjectThumbnail.scss'
import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { IconPlayerPauseFilled, IconPlayerPlayFilled } from '@tabler/icons-react';

// Memoized regex patterns
const IMAGE_FORMATS_REGEX = /[.](png|jpg|jpeg|svg|gif)$/i;
const VIDEO_FORMATS_REGEX = /[.]mp4$/i;

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
    autoplay = true,
    collection,
    ...props
}) {
    const [isIntersecting, setIsIntersecting] = useState(false);
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [manuallyPaused, setManuallyPaused] = useState(false);
    const observerRef = useRef(null);

    // Reset states when asset changes
    useEffect(() => {
        setIsPlaying(false);
        setManuallyPaused(false);
    }, [asset]);

    // Memoize the intersection observer callback
    const intersectionCallback = useCallback(([entry]) => {
        setIsIntersecting(entry.isIntersecting);
    }, []);

    useEffect(() => {
        if (!videoRef.current) return;

        observerRef.current = new IntersectionObserver(intersectionCallback, { threshold: 0.3 });
        observerRef.current.observe(videoRef.current);

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, [intersectionCallback, asset]); // Re-setup observer when asset changes

    // Memoize video play/pause handler
    const handleVideoPlayback = useCallback(() => {
        if (!videoRef.current) return;

        if (autoplay === false) {
            videoRef.current.currentTime = 1;
            videoRef.current.play();
            videoRef.current.pause();
        } else if (isIntersecting && !manuallyPaused && autoplay !== false) {
            const playPromise = videoRef.current.play();
            if (playPromise !== undefined) {
                playPromise
                    .then(() => setIsPlaying(true))
                    .catch(() => setIsPlaying(false));
            }
        } else {
            videoRef.current.pause();
            setIsPlaying(false);
        }
    }, [isIntersecting, manuallyPaused, autoplay]);

    useEffect(() => {
        handleVideoPlayback();
    }, [handleVideoPlayback]);

    // Load video when asset changes
    useEffect(() => {
        if (videoRef.current && VIDEO_FORMATS_REGEX.test(asset)) {
            videoRef.current.load();
        }
    }, [asset]);

    // Memoize video button click handler
    const handleVideoButtonClick = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        const video = videoRef.current;
        if (!video) return;

        if (video.paused) {
            video.play();
            setIsPlaying(true);
            setManuallyPaused(false);
        } else {
            video.pause();
            setIsPlaying(false);
            setManuallyPaused(true);
        }
    }, []);

    // Render thumbnail with asset dependency
    const renderThumbnail = useMemo(() => {
        if (IMAGE_FORMATS_REGEX.test(asset)) {
            return (
                <Image
                    src={asset}
                    alt={title}
                    fill
                    priority={priority}
                    sizes={sizes}
                    loading={priority ? 'eager' : 'lazy'}
                />
            );
        }

        if (VIDEO_FORMATS_REGEX.test(asset)) {
            return (
                <>
                    <video
                        ref={videoRef}
                        playsInline
                        muted
                        loop
                        preload="metadata"
                    >
                        <source src={asset} type="video/mp4" />
                    </video>
                    <button
                        onClick={handleVideoButtonClick}
                        className="playpause_button"
                        title={isPlaying ? "Pause" : "Play"}
                    >
                        {isPlaying ? <IconPlayerPauseFilled /> : <IconPlayerPlayFilled />}
                    </button>
                </>
            );
        }

        return (
            <div>
                <span>Error</span>
            </div>
        );
    }, [asset, title, priority, sizes, isPlaying, handleVideoButtonClick]);

    const Tag = as || "div";

    const content = (
        <>
            <div className="project_artwork" aria-hidden="true">
                {renderThumbnail}
            </div>
            {!img_only && (
                <div className="project_info">
                    <h3 className="title">{title}</h3>
                    <span className="subtitle">{subtitle}</span>
                </div>
            )}
        </>
    );

    const commonProps = {
        className: "project_thumbnail",
        "data-name": title,
        "data-img-only": img_only,
        "data-portrait": portrait,
        "data-fade-in": fadeIn,
        "data-collection": collection
    };

    return url ? (
        <Link href={url} {...commonProps}>
            <AccessibilityLabel role="text" as="span">
                {title}
            </AccessibilityLabel>
            {content}
        </Link>
    ) : (
        <Tag {...commonProps}>
            {content}
        </Tag>
    );
}