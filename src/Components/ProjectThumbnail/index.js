import React from "react";
import "./index.scss";

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
        <h3>{props.title}</h3>
        <p>{props.description}</p>
      </div>
    </article>
  );
}

export default ProjectThumbnail;
