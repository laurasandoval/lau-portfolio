import { useRef, useState, useEffect } from 'react';
import './index.scss'

export default function SnappingFeedSlideVideo({
    asset,
    tryToAutoPlay
}) {
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    function handlePlay() {
        if (videoRef.current.paused) {
            videoRef.current.play();
            setIsPlaying(true);
        } else {
            videoRef.current.pause();
            setIsPlaying(false);
        }
    }

    useEffect(() => {
        if (tryToAutoPlay) {
            videoRef.current.muted = false;
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
        }
    }, [tryToAutoPlay]);

    return (
        <>
            <video
                ref={videoRef}
                className="asset video"
                playsInline
                loop
            >
                <source
                    src={`/assets/video-work/${asset.src}`}
                    type="video/mp4"
                />
            </video>
            <button onClick={handlePlay}>{isPlaying ? "Pause" : "Play"}</button>
        </>
    )
}
