import React from "react";
import "./index.scss";
import { format } from "date-fns";
import { enUS } from 'date-fns/locale'

function ProjectThumbnail(props) {
  return (
    <article className="project-thumbnail" data-name={props.title}>
      <figure className="project-artwork">
        {props.artwork_type === "img" ? (
          <img
            src={require(`../../Assets/project-images/${props.artwork_src}`)}
            alt="Dummy project description"
          ></img>
        ) : (
          <video playsInline muted autoPlay loop>
            <source
              src={require(`../../Assets/project-images/${props.artwork_src.replace(".mp4",".webm")}`)}
              type="video/webm"
            />
            <source
              src={require(`../../Assets/project-images/${props.artwork_src.replace(".webm",".mp4")}`)}
              type="video/mp4"
            />
          </video>
        )}
      </figure>
      <div className="project-info">
        <h3 class="title">{props.title}</h3>
        <p class="date">{format(new Date(props.start_year, (props.start_month - 1)), 'MMMM yyyy', {locale: enUS})}</p>
      </div>
    </article>
  );
}

export default ProjectThumbnail;
