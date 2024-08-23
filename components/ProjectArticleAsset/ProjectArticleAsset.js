import { IconPlayerPauseFilled, IconPlayerPlayFilled } from '@tabler/icons-react';
import './ProjectArticleAsset.scss'
import { useState, useRef } from 'react';

export default function ProjectArticleAsset({
    src,
    caption,
    autoplay = true,
}) {
    const [isPlaying, setIsPlaying] = useState(autoplay);
    const [showVideo, setShowVideo] = useState(false);
    const videoRef = useRef(null);

    const isVideo = src.endsWith('.mp4') || src.endsWith('.webm');
    const isYouTube = src.includes('youtube.com') || src.includes('youtu.be');

    const togglePlayPause = () => {
        if (isYouTube) {
            setShowVideo(true);
        } else if (isPlaying) {
            videoRef.current.pause();
        } else {
            videoRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const getYouTubeThumbnail = (url) => {
        const videoId = url.includes('youtu.be')
            ? url.split('/').pop()
            : url.split('v=')[1].split('&')[0];
        return `http://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
    };

    return (
        <figure className="project_article_asset">
            {isYouTube ? (
                <div className="youtube_container">
                    {!showVideo ? (
                        <div className="youtube_thumbnail" onClick={togglePlayPause}>
                            <img
                                src={getYouTubeThumbnail(src)}
                                alt={caption || "YouTube Thumbnail"}
                                className="project_article_image"
                            />
                            <button className="play_button">
                                <div className="play_button_affordance button">
                                    <IconPlayerPlayFilled />
                                </div>
                            </button>
                        </div>
                    ) : (
                        <iframe
                            src={`https://www.youtube.com/embed/${src.includes('youtu.be')
                                ? src.split('/').pop()
                                : src.split('v=')[1].split('&')[0]
                                }?autoplay=1`}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="youtube_iframe"
                        />
                    )}
                </div>
            ) : isVideo ? (
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
                        className="playpause_button button"
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

