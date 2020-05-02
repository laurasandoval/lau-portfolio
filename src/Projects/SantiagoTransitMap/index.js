import React from "react";

class SantiagoTransitMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      thumbnail: false
    };

    this._renderThumbnail = this._renderThumbnail.bind(this);
    this._renderPage = this._renderPage.bind(this);
  }

  _renderThumbnail(type, source) {
    return (
      <article>
        <figure className="project-artwork">
          {type === "img" ? (
            <img
              src="https://jose.work/selected-works-img/santiago-transit-map-s4.png?date=2609191050"
              alt="Dummy project image description"
            ></img>
          ) : (
            <p>no video yet, sorry</p>
          )}
        </figure>
        <div className="project-info">
          <h3>Dummy Project Title</h3>
          <p>Dummy Project Description</p>
        </div>
      </article>
    );
  }

  _renderPage() {
    return (
      <div>
        <p>hello world!</p>
      </div>
    );
  }

  render() {
    // const { img, pdf, pageNumber } = this.state;
    const { thumbnail } = this.props;

    return (
      <React.Fragment>
        {thumbnail
          ? this._renderThumbnail(
              "img",
              "https://jose.work/selected-works-img/santiago-transit-map-s4.png?date=2609191050"
            )
          : this._renderPage()}
      </React.Fragment>
    );
  }
}

export default SantiagoTransitMap;
