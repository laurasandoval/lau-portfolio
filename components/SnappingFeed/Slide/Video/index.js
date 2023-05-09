import { useRef, useState, useEffect } from 'react';
import './index.scss'
import { IconMaximize, IconVolume, IconVolumeOff } from '@tabler/icons-react';

export default function SnappingFeedSlideVideo({
    asset,
    current,
    priority,
    allVideosAreMuted,
    setAllVideosAreMuted,
}) {
    const assetContainerRef = useRef(null);
    const videoRef = useRef(null);
    const fullScreenButtonRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    function handleMute() {
        if (videoRef.current.muted) {
            videoRef.current.muted = false;
            setAllVideosAreMuted(false);
        } else {
            videoRef.current.muted = true;
            setAllVideosAreMuted(true);
        }
    }

    function handleFullscreen() {
        const video = videoRef.current;

        if (video.requestFullscreen) {
            video.requestFullscreen();
            if (videoRef.current.muted) {
                handleMute()
            }
        } else if (video.webkitRequestFullscreen) { /* Safari */
            video.webkitRequestFullscreen();
            if (videoRef.current.muted) {
                handleMute()
            }
        } else if (video.msRequestFullscreen) { /* IE11 */
            video.msRequestFullscreen();
            if (videoRef.current.muted) {
                handleMute()
            }
        } else if (video.webkitEnterFullscreen) { /* iOS Safari */
            video.webkitEnterFullscreen();
            if (videoRef.current.muted) {
                handleMute()
            }
        }
    }

    useEffect(() => {
        if (allVideosAreMuted) {
            videoRef.current.muted = true;
            setAllVideosAreMuted(true);
        } else {
            videoRef.current.muted = false;
            setAllVideosAreMuted(false);
        }
    }, [allVideosAreMuted]);

    useEffect(() => {
        if (current) {
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
            videoRef.current.pause();
            setIsPlaying(false);
            videoRef.current.currentTime = 0;
        }
    }, [current]);

    useEffect(() => {
        function getHeights() {
            if (videoRef.current) {
                const originalWidth = asset.width;
                const originalHeight = asset.height;
                const aspectRatio = originalHeight / originalWidth;

                const viewportWidth = window.innerWidth;
                const computedHeight = Math.round(viewportWidth * aspectRatio);

                assetContainerRef.current.style.setProperty('--computed-video-height', `${computedHeight}px`);
            }
            if (fullScreenButtonRef.current) {
                const fullScreenButtonHeight = Math.round(fullScreenButtonRef.current.offsetHeight);
                assetContainerRef.current.style.setProperty('--computed-full-screen-button-height', `${fullScreenButtonHeight}px`);
            }
        }


        getHeights();

        window.addEventListener('resize', getHeights);

        return () => {
            window.removeEventListener('resize', getHeights);
        };
    }, []);

    useEffect(() => {
        function handleExitFullscreen() {
            setTimeout(() => {
                videoRef.current.play().then(() => {
                    setIsPlaying(true);
                }).catch((error) => {
                    setIsPlaying(false);
                    console.error("Error attempting to auto-play video: ", error);
                });
            }, 300)
        }

        videoRef.current.addEventListener("webkitendfullscreen", handleExitFullscreen);

        return () => {
            videoRef.current.removeEventListener("webkitendfullscreen", handleExitFullscreen);
        };
    }, []);

    return (
        <div
            ref={assetContainerRef}
            className="asset_container"
            data-type="video"
            data-orientation={asset.width > asset.height ? "landscape" : asset.width < asset.height ? "portrait" : "square"}
        >
            <video
                ref={videoRef}
                className="asset"
                playsInline
                muted
                loop
            >
                <source
                    src={`/assets/video-work/${asset.src}`}
                    type="video/mp4"
                />
            </video>
            <button
                onClick={handleMute}
                className="unmute_button"
                title={allVideosAreMuted ? "Unmute" : "Mute"}
            >
                <div
                    className="unmute_button_affordance"
                    data-visible={allVideosAreMuted}
                >
                    {allVideosAreMuted ? <IconVolumeOff /> : <IconVolume />}
                </div>
            </button>
            {
                asset.width > asset.height &&
                <div className="fullscreen_button_container">
                    <div className="fake_video_container">
                        <button
                            onClick={handleFullscreen}
                            className="fullscreen_button"
                            title="Full screen"
                            ref={fullScreenButtonRef}
                        >
                            <IconMaximize />
                            <p>Full screen</p>
                        </button>
                    </div>
                </div>
            }
        </div>
    )
}
