import { useRef, useState, useEffect } from 'react';
import './index.scss'
import { IconVolume, IconVolumeOff } from '@tabler/icons-react';

export default function SnappingFeedSlideVideo({
    asset,
    current,
}) {
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(true);

    function handleMute() {
        if (videoRef.current.muted) {
            videoRef.current.muted = false;
            setIsMuted(false);
        } else {
            videoRef.current.muted = true;
            setIsMuted(true);
        }
    }

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
        <div className="asset video_container">
            <video
                ref={videoRef}
                className="video"
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
                    data-visible={isMuted}
                >
                    {isMuted ? <IconVolumeOff /> : <IconVolume />}
                </div>
            </button>
        </div>
    )
}
