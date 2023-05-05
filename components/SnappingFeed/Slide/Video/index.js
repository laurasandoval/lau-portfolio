import { useRef, useState, useEffect } from 'react';
import './index.scss'
import { IconVolume, IconVolumeOff } from '@tabler/icons-react';

export default function SnappingFeedSlideVideo({
    asset,
    current,
    priority,
    allVideosAreMuted,
    setAllVideosAreMuted,
}) {
    const videoRef = useRef(null);
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

    return (
        <div
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
            >
                <div
                    className="unmute_button_affordance"
                    data-visible={allVideosAreMuted}
                >
                    {allVideosAreMuted ? <IconVolumeOff /> : <IconVolume />}
                </div>
            </button>
        </div>
    )
}
