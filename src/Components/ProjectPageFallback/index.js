import React, { Fragment } from "react";
import { Helmet } from "react-helmet";
import { throttle } from "lodash";
import "./index.scss";
import GlobalHeader from "../GlobalHeader";
import ProjectThumbnail from "../ProjectThumbnail";
import Time from "../Time";
import AccessibilityLabel from "../AccessibilityLabel";

class ProjectPageFallback extends React.PureComponent {
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
            {this.props.thumbnails.map((thumbnail, index) => {
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
              <h2 className="title">{this.props.title}</h2>
              {
                this.props.description &&
                <div className="description">
                  {this.props.description.map((p, i) => {
                    return <p key={i}>{p}</p>;
                  })}
                </div>
              }
              {this.props.cta && (
                <div className="ctas">
                  {this.props.cta.map((cta, i) => {
                    return (
                      <a
                        className="call-to-action"
                        key={i}
                        href={cta.url}
                        rel="noopener noreferrer"
                      >
                        {cta.title}{" "}
                        <span className="right-arrow" aria-hidden="true">
                          →
                        </span>
                      </a>
                    );
                  })}
                </div>
              )}
            </div>
            <div className="credits">
              {this.props.client && (
                <div className="item" role="text">
                  <h3>
                    Client<AccessibilityLabel>: </AccessibilityLabel>
                  </h3>
                  <p>{this.props.client}</p>
                </div>
              )}
              <div className="item" role="text">
                <h3>
                  Date<AccessibilityLabel>: </AccessibilityLabel>
                </h3>
                <p>
                  <Time
                    year={this.props.release_year}
                    month={this.props.release_month}
                    as="span"
                  />
                </p>
              </div>
              {this.props.team &&
                Object.keys(this.props.team).map((item, i) => {
                  return (
                    <div className="item" key={i} role="text">
                      <h3>
                        {item}
                        <AccessibilityLabel>: </AccessibilityLabel>
                      </h3>
                      {this.props.team[item].map((person, i) => {
                        if (this.props.team[item].length > 1) {
                          if (i + 1 === this.props.team[item].length) {
                            return (
                              <p key={i}>
                                {person.name}
                                <AccessibilityLabel>.</AccessibilityLabel>
                              </p>
                            );
                          } else if (
                            i + 1 ===
                            this.props.team[item].length - 1
                          ) {
                            return (
                              <p key={i}>
                                {person.name}
                                <AccessibilityLabel> and </AccessibilityLabel>
                              </p>
                            );
                          } else {
                            return (
                              <p key={i}>
                                {person.name}
                                <AccessibilityLabel>, </AccessibilityLabel>
                              </p>
                            );
                          }
                        } else {
                          return <p key={i}>{person.name}</p>;
                        }
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
