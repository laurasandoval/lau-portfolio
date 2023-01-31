import Link from 'next/link'
import AccessibilityLabel from '../AccessibilityLabel/AccessibilityLabel'
import './ProjectThumbnail.scss'

export function ProjectThumbnail({
    as,
    title,
    year,
    src,
    thumbnail,
    thumbnails,
    hover,
    img_only,
    autoplay,
    portrait,
    fadeIn,
}) {
    const _renderThumbnail = (thumbnail, src, title, autoplay) => {
        const imageFormats = ["png", "jpg", "jpeg", "svg", "gif"]
        const videoFormats = ["mp4", "webm"]

        if (new RegExp(`[.](${imageFormats.join("|")})`).test(thumbnail)) {
            return (
                <img
                    src={`/Work/${src}/thumbnails/${thumbnail}`}
                    alt={title}
                />
            )
        } else if (new RegExp(`[.](${videoFormats.join("|")})`).test(thumbnail)) {
            return (
                <video playsInline muted autoPlay={autoplay} loop>
                    <source
                        src={`/Work/${src}/thumbnails/${thumbnail.replace(
                            ".mp4",
                            ".webm"
                        )}`}
                        type="video/webm"
                    />
                    <source
                        src={`/Work/${src}/thumbnails/${thumbnail.replace(
                            ".webm",
                            ".mp4"
                        )}`}
                        type="video/mp4"
                    />
                </video>
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

    return (
        <Tag
            className="project_thumbnail"
            data-name={title}
            data-hover={hover}
            data-img-only={img_only}
            data-portrait={portrait}
            data-fade-in={fadeIn}
        >
            {hover && (
                <Link href={`/${src}`} className="project_access">
                    <AccessibilityLabel role="text" as="span">
                        {title}
                    </AccessibilityLabel>
                </Link>
            )}
            <div className="project_artwork" aria-hidden="true">
                {_renderThumbnail(thumbnail ? thumbnail : thumbnails[0], src, title, autoplay)}
            </div>
            {!img_only && (
                <div className="project_info" aria-hidden={hover}>
                    <h3 className="title">{title}</h3>
                    <span className="date">{year}</span>
                </div>
            )}
        </Tag>
    )
}