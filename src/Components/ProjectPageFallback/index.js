import React, { Fragment } from "react";
import { Helmet } from "react-helmet";
import { throttle } from "lodash";
import "./index.scss";
import GlobalHeader from "../GlobalHeader";
import ProjectThumbnail from "../ProjectThumbnail";
import Time from "../Time";

class ProjectPageFallback extends React.Component {
  constructor(props) {
    super(props);

    this._showGalleryBorder = this._showGalleryBorder.bind(this);
    this._hideGalleryBorder = this._hideGalleryBorder.bind(this);
    this.state = {
      showGalleryBorder: false,
    };
  }

  componentDidMount() {
    window.addEventListener("scroll", this._throttledScrollCheck);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this._throttledScrollCheck);
  }

  _throttledScrollCheck = throttle(() => {
    if (
      this.projectGallery &&
      this.projectGallery.offsetTop <= window.scrollY
    ) {
      this._showGalleryBorder();
    } else {
      this._hideGalleryBorder();
    }
  }, 250);

  _showGalleryBorder() {
    this.setState({
      showGalleryBorder: true,
    });
  }

  _hideGalleryBorder() {
    this.setState({
      showGalleryBorder: false,
    });
  }

  render() {
    return (
      <Fragment>
        <Helmet>
          <title>{this.props.title} — Laura Sandoval</title>
        </Helmet>

        <GlobalHeader />
        <article className="project-page-fallback" data-name={this.props.title}>
          <div
            className="project-gallery"
            data-show-border={this.state.showGalleryBorder}
            ref={(projectGallery) => {
              this.projectGallery = projectGallery;
            }}
          >
            {this.props.thumbnails.landscape.map((thumbnail, index) => {
              return (
                <ProjectThumbnail
                  {...this.props}
                  img_only
                  thumbnail={thumbnail}
                  key={index}
                  autoplay
                />
              );
            })}
          </div>
          <div className="project-info">
            <div className="main">
              <h1 className="title">{this.props.title}</h1>
              <h2 className="description">{this.props.description}</h2>
              {this.props.cta && (
                <div className="ctas">
                  {this.props.cta.map((cta, i) => {
                    return (
                      <a
                        className="call-to-action"
                        key={i}
                        href={cta.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {cta.title}
                      </a>
                    );
                  })}
                </div>
              )}
            </div>
            <div className="credits">
              {this.props.client && (
                <div className="item">
                  <h3>Client</h3>
                  <p>{this.props.client}</p>
                </div>
              )}
              <div className="item">
                <h3>Release Date</h3>
                <p>
                  <Time
                    year={this.props.release_year}
                    month={this.props.release_month}
                  />
                </p>
              </div>
              {this.props.team &&
                Object.keys(this.props.team).map((item, i) => {
                  return (
                    <div className="item" key={i}>
                      <h3>{item}</h3>
                      {this.props.team[item].map((person, i) => {
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
}

export default ProjectPageFallback;
