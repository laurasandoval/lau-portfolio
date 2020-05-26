import React, { Fragment } from "react";
import "./index.scss";
import AccessibilityLabel from "../../../Components/AccessibilityLabel";
import ProjectThumbnail from "../../../Components/ProjectThumbnail";

class RemainingItems extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showComponent: false,
    };

    this._showRemainingItems = this._showRemainingItems.bind(this);
  }

  _showRemainingItems() {
    this.setState({
      showComponent: true,
    });
  }

  render() {
    const { as, remainingCount, itemsToShow } = this.props;

    const Tag = as;

    return (
      <Fragment>
        {this.state.showComponent === false && (
          <Tag className="see-all-thumbnail">
            <button
              className="button-access"
              onClick={this._showRemainingItems}
            >
              <AccessibilityLabel role="text">
                See all, {remainingCount} remaining project
              </AccessibilityLabel>
            </button>
            <div className="content" aria-hidden="true">
              <div className="cards-stack">
                <span className="card" />
                <span className="card" />
                <span className="card">
                  <span className="remaining-count">{remainingCount}</span>
                </span>
              </div>
              <div className="text">
                <h3 className="title">See all</h3>
                <h4 className="subtitle">Remaining Projects</h4>
              </div>
            </div>
          </Tag>
        )}
        {this.state.showComponent === true &&
          itemsToShow.map((project, index) => {
            return (
              <ProjectThumbnail {...project} as="article" key={index} hover fadeIn autoplay />
            );
          })}
      </Fragment>
    );
  }
}

export default RemainingItems;
