import React from "react";
import "./index.scss";
import { format } from "date-fns";
import { enUS } from "date-fns/locale";

class ProjectThumbnail extends React.Component {
  constructor(props) {
    super(props);

    this._renderThumbnail = this._renderThumbnail.bind(this);
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

  render() {
    const {
      title,
      start_year,
      start_month,
      src,
      thumbnails,
    } = this.props;

    const randomThumbnail = thumbnails.sort(
      () => Math.random() - Math.random()
    )[0];

    return (
      <article className="project-thumbnail" data-name={title}>
        <figure className="project-artwork">
          {this._renderThumbnail(randomThumbnail, src)}
        </figure>
        <div className="project-info">
          <h3 className="title">{title}</h3>
          <time dateTime={`${start_year}-${start_month}`} className="date">
            {format(new Date(start_year, start_month - 1), "MMMM yyyy", {
              locale: enUS,
            })}
          </time>
        </div>
      </article>
    );
  }
}

export default ProjectThumbnail;
