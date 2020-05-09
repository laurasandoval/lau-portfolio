import React from "react";
import "./index.scss";
import { format } from "date-fns";
import { enUS } from "date-fns/locale";
import { Link } from "react-router-dom";
import AccessibilityLabel from "../AccessibilityLabel";

class ProjectThumbnail extends React.Component {
  constructor(props) {
    super(props);

    this._renderThumbnail = this._renderThumbnail.bind(this);
    this._renderTime = this._renderTime.bind(this);
  }

  _renderThumbnail(thumbnail, src) {
    const imageFormats = ["png", "jpg", "jpeg", "svg", "gif"];
    const videoFormats = ["mp4", "webm"];

    if (new RegExp(`[.](${imageFormats.join("|")})`).test(thumbnail)) {
      return (
        <img
          src={require(`../../Work/${src}/thumbnails/${thumbnail}`)}
          alt="Dummy project description"
        ></img>
      );
    } else if (new RegExp(`[.](${videoFormats.join("|")})`).test(thumbnail)) {
      return (
        <video playsInline muted autoPlay loop>
          <source
            src={require(`../../Work/${src}/thumbnails/${thumbnail.replace(
              ".mp4",
              ".webm"
            )}`)}
            type="video/webm"
          />
          <source
            src={require(`../../Work/${src}/thumbnails/${thumbnail.replace(
              ".webm",
              ".mp4"
            )}`)}
            type="video/mp4"
          />
        </video>
      );
    }
  }

  _renderTime(start_year, start_month) {
    return (
      <time dateTime={`${start_year}-${start_month}`} className="date">
        {format(new Date(start_year, start_month - 1), "MMMM yyyy", {
          locale: enUS,
        })}
      </time>
    );
  }

  render() {
    const { title, start_year, start_month, src, thumbnails } = this.props;

    const randomThumbnail = thumbnails.sort(
      () => Math.random() - Math.random()
    )[0];

    return (
      <article className="project-thumbnail" data-name={title}>
        <Link to={src} className="project-access">
          <AccessibilityLabel as="span">
            {title} | {this._renderTime(start_year, start_month)}
          </AccessibilityLabel>
        </Link>
        <figure className="project-artwork" aria-hidden="true">
          <div className="artwork shadow">
            {this._renderThumbnail(randomThumbnail, src)}
          </div>
          <div className="artwork">
            {this._renderThumbnail(randomThumbnail, src)}
          </div>
        </figure>
        <div className="project-info" aria-hidden="true">
          <h3 className="title">{title}</h3>
          {this._renderTime(start_year, start_month)}
        </div>
      </article>
    );
  }
}

export default ProjectThumbnail;
