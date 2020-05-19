import React, { Suspense } from "react";
import "./index.scss";
import { Link } from "react-router-dom";
import AccessibilityLabel from "../AccessibilityLabel";
import Time from "../Time";

class ProjectThumbnail extends React.Component {
  constructor(props) {
    super(props);

    this._renderThumbnail = this._renderThumbnail.bind(this);
  }

  _renderThumbnail(thumbnail, src, title, autoplay) {
    const imageFormats = ["png", "jpg", "jpeg", "svg", "gif"];
    const videoFormats = ["mp4", "webm"];
    const HtmlThumbnail = React.lazy(() =>
      import(`../../Work/${src}/thumbnails/${thumbnail}`)
    );

    if (new RegExp(`[.](${imageFormats.join("|")})`).test(thumbnail)) {
      return (
        <img
          src={require(`../../Work/${src}/thumbnails/${thumbnail}`)}
          alt={title}
        ></img>
      );
    } else if (new RegExp(`[.](${videoFormats.join("|")})`).test(thumbnail)) {
      console.log(autoplay);
      
      return (
        <video playsInline muted autoPlay={autoplay} loop>
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
    } else {
      return (
        <div className="html-thumbnail-container">
          <Suspense fallback={<span></span>}>
            <HtmlThumbnail />
          </Suspense>
        </div>
      );
    }
  }

  render() {
    const {
      as,
      title,
      release_year,
      release_month,
      src,
      thumbnail,
      thumbnails,
      hover,
      img_only,
      autoplay
    } = this.props;

    const Tag = as ? as : "div";
    const thumbnailToRender = thumbnail
      ? thumbnail
      : thumbnails.slice().sort(() => Math.random() - Math.random())[0];
      
    return (
      <Tag className="project-thumbnail" data-name={title} data-hover={hover}>
        {hover && (
          <Link to={`/${src}`} className="project-access">
            <AccessibilityLabel as="span">
              {title} | <Time year={release_year} month={release_month} />
            </AccessibilityLabel>
          </Link>
        )}
        <figure className="project-artwork" aria-hidden={hover}>
          {this._renderThumbnail(thumbnailToRender, src, title, autoplay)}
        </figure>
        {!img_only && (
          <div className="project-info" aria-hidden={hover}>
            <h3 className="title">{title}</h3>
            <Time year={release_year} month={release_month} />
          </div>
        )}
      </Tag>
    );
  }
}

export default ProjectThumbnail;
