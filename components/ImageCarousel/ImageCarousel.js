import { ProjectThumbnail } from '../ProjectThumbnail/ProjectThumbnail';
import './ImageCarousel.scss'

export default function ImageCarousel({
    currentProject,
    selectedIndex
}) {
    return (
        <div className="image_carousel">
            {
                currentProject?.thumbnails.map((thumbnail, index) => {
                    return (
                        <div className="slide" key={index}>
                            <ProjectThumbnail
                                {...currentProject}
                                img_only
                                thumbnail={thumbnail}
                                autoplay
                                priority={index == 0}
                            />
                        </div>
                    );
                })
            }
        </div>
    )
}