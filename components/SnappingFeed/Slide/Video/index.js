import { useRef, useState, useEffect } from 'react';
import './index.scss'
import { IconMaximize, IconVolume, IconVolumeOff } from '@tabler/icons-react';
import { throttle } from 'lodash';

export default function SnappingFeedSlideVideo({
    asset,
    current,
    priority,
    assetsContainerComputedHeight,
    allVideosAreMuted,
    setAllVideosAreMuted,
}) {
    const assetContainerRef = useRef(null);
    const videoRef = useRef(null);
    const fullScreenButtonRef = useRef(null);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [videoComputedHeight, setVideoComputedHeight] = useState(0);

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
        if (current && !isFullScreen) {
            const playPromise = videoRef.current.play();
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    setIsPlaying(true);
                }).catch((error) => {
                    setIsPlaying(false);
                    console.error("Error attempting to auto-play video: ", error);
                });
            }
        } else if (!isFullScreen) {
            videoRef.current.pause();
            setIsPlaying(false);
            videoRef.current.currentTime = 0;
        }
    }, [current]);

    useEffect(() => {
        const getHeights = throttle(() => {
            if (videoRef.current && !isFullScreen) {
                const computedHeight = videoRef.current.offsetHeight;
                assetContainerRef.current.style.setProperty('--computed-video-height', `${computedHeight}px`);
                setVideoComputedHeight(computedHeight);
            }
            if (fullScreenButtonRef.current && !isFullScreen) {
                const fullScreenButtonHeight = Math.round(fullScreenButtonRef.current.clientHeight);
                assetContainerRef.current.style.setProperty('--computed-full-screen-button-height', `${fullScreenButtonHeight}px`);
            }
        }, 200);

        getHeights();

        window.addEventListener('resize', getHeights);

        return () => {
            window.removeEventListener('resize', getHeights);
        };
    }, []);

    useEffect(() => {
        function handleExitFullScreen() {
            setIsFullScreen(false);
            setTimeout(() => {
                videoRef.current.play().then(() => {
                    setIsPlaying(true);
                }).catch((error) => {
                    setIsPlaying(false);
                    console.error("Error attempting to auto-play video: ", error);
                });
            }, 300)
        }

        function checkForFullScreen() {
            if (document.fullscreenElement || document.webkitIsFullScreen || document.mozFullScreen) {
                setIsFullScreen(true);
            }
            else {
                setTimeout(() => {
                    setIsFullScreen(false);
                }, 300)
            }
        }

        videoRef.current?.addEventListener("webkitendfullscreen", handleExitFullScreen);

        ["fullscreenchange", "webkitfullscreenchange", "mozfullscreenchange", "msfullscreenchange"].forEach(
            eventType => document.addEventListener(eventType, checkForFullScreen, false)
        );

        return () => {
            videoRef.current?.removeEventListener("webkitendfullscreen", handleExitFullScreen);
        };
    }, []);

    return (
        <div
            ref={assetContainerRef}
            className="asset_container"
            data-type="video"
            data-orientation={asset.width > asset.height ? "landscape" : asset.width < asset.height ? "portrait" : "square"}
            data-video-is-taller-than-container={assetsContainerComputedHeight < videoComputedHeight}
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
