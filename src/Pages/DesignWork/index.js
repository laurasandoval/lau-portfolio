import React, { Fragment } from "react";
import Data from "../../Assets/design-work.json";
import Grid from "../../Components/Grid";
import ProjectThumbnail from "../../Components/ProjectThumbnail";
import AccessibilityLabel from "../../Components/AccessibilityLabel";
import GlobalHeader from "../../Components/GlobalHeader";
import { Helmet } from "react-helmet";
import Callout from "../../Components/Callout";

class DesignWork extends React.PureComponent {
  constructor(props) {
    super(props);

    this._renderThumbnail = this._renderThumbnail.bind(this);
  }

  _renderThumbnail(project, index, featured) {
    return (
      <ProjectThumbnail
        {...project}
        as="article"
        hover
        autoplay
        key={index}
        portrait={featured}
        fadeIn
      />
    );
  }

  render() {
    const maxFeaturedCount = 6;

    const featuredProjects = Data.DesignWork.slice(0, maxFeaturedCount);
    const remainingProjects = Data.DesignWork.slice(maxFeaturedCount, featuredProjects.lenght);

    return (
      <Fragment>
        <Helmet>
          <title>Laura Sandoval — Work</title>
        </Helmet>

        <GlobalHeader sticky />
        <AccessibilityLabel as="h2">Selected Works</AccessibilityLabel>
        <Grid featured>
          {featuredProjects.map((project, index) => {
            return this._renderThumbnail(project, index, true);
          })}
        </Grid>
        <Grid>
          {remainingProjects.map((project, index) => {
            return this._renderThumbnail(project, index);
          })}
        </Grid>
        <Callout>
          <p>This portfolio website uses Bézier Curves (aka. <a href="/squircles.png" rel="noopener noreferrer">squircles</a>) and it's also part of my portfolio. You can find the code on <a href="https://github.com/laurasandoval/lau-portfolio/" rel="noopener noreferrer">GitHub</a>.</p>
        </Callout>
      </Fragment>
    );
  }
}

export default DesignWork;
