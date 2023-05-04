import { useRef, useState } from 'react';
import './index.scss'

export default function SnappingFeedSlideVideo({
    asset
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