import React from "react";
import "./index.scss";

function ProjectThumbnail(props) {
  return (
    <article data-name={props.title}>
      <figure className="project-artwork">
        {props.artwork_type === "img" ? (
          <img
            src={props.artwork_src}
            alt="Dummy project description"
          ></img>
        ) : (
          <p>no video yet, sorry</p>
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
