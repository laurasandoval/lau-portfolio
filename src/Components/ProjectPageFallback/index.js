import React, { Fragment } from "react";
import "./index.scss";
import GlobalHeader from "../GlobalHeader";
import ProjectThumbnail from "../ProjectThumbnail";
import Time from "../Time";

function ProjectPageFallback(props) {
  console.log(props.team);

  return (
    <Fragment>
      <GlobalHeader />
      <article className="project-page-fallback" data-name={props.title}>
        <div className="project-gallery">
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
        <div className="project-info">
          <div className="main">
            <h1 className="title">{props.title}</h1>
            <h2 className="description">{props.description}</h2>
          </div>
          <div className="credits">
            {props.client && (
              <div className="item">
                <h3>Client</h3>
                <p>{props.client}</p>
              </div>
            )}
            <div className="item">
              <h3>Release Date</h3>
              <p>
                <Time year={props.start_year} month={props.start_month} />
              </p>
            </div>
            {props.team &&
              Object.keys(props.team).map((item, i) => {
                return (
                  <div className="item" key={i}>
                    <h3>{item}</h3>
                    {props.team[item].map((person, i) => {
                      return <p key={i}>{person.name}</p>;
                    })}
                  </div>
                );
              })}
          </div>
        </div>
      </article>
    </Fragment>
  );
}

export default ProjectPageFallback;
