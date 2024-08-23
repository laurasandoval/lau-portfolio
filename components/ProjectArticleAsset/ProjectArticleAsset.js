import { IconPlayerPauseFilled, IconPlayerPlayFilled } from '@tabler/icons-react';
import './ProjectArticleAsset.scss'
import { useState, useRef } from 'react';

export default function ProjectArticleAsset({
    src,
    caption,
    autoplay = true,
}) {
    const [isPlaying, setIsPlaying] = useState(autoplay);
    const videoRef = useRef(null);

    const isVideo = src.endsWith('.mp4') || src.endsWith('.webm');

    const togglePlayPause = () => {
        if (isPlaying) {
            videoRef.current.pause();
        } else {
            videoRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <figure className="project_article_asset">
            {isVideo ? (
                <div className="video_container">
                    <video
                        ref={videoRef}
                        src={src}
                        loop
                        muted
                        autoPlay={autoplay}
                        playsInline
                        className="project_article_video"
                    />
                    <button
                        onClick={togglePlayPause}
                        className="playpause_button"
                        title={isPlaying ? "Pause" : "Play"}
                    >
                        {isPlaying ? <IconPlayerPauseFilled /> : <IconPlayerPlayFilled />}
                    </button>
                </div>
            ) : (
                <img
                    src={src}
                    className="project_article_image"
                />
            )}
            {caption && <figcaption>{caption}</figcaption>}
        </figure>
    );
}

