import React, { Fragment } from "react";
import "./index.scss";
import GlobalHeader from "../GlobalHeader";
import ProjectThumbnail from "../ProjectThumbnail";

function ProjectPageFallback(props) {
  return (
    <Fragment>
      <GlobalHeader />
      <article className="project-page-fallback" data-name={props.title}>
        <div class="gallery">
          {props.thumbnails.map((thumbnail, index) => {
            return (
              <ProjectThumbnail
                {...props}
                img_only
                thumbnail={thumbnail}
                key={index}
              />
            );
          })}
        </div>
        <div>

        </div>
      </article>
    </Fragment>
  );
}

export default ProjectPageFallback;
