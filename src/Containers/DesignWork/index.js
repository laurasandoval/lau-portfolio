import React, { Fragment } from "react";
import { debounce } from "lodash";
import Data from "../../Assets/design-work.json";
import Grid from "../../Components/Grid";
import ProjectThumbnail from "../../Components/ProjectThumbnail";
import AccessibilityLabel from "../../Components/AccessibilityLabel";
import GlobalHeader from "../../Components/GlobalHeader";
import { Helmet } from "react-helmet";
import RemainingItems from "./RemainingItems";

class DesignWork extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMobile: false,
      viewportChecked: false,
      viewportWidth: undefined,
    };

    this._renderThumbnail = this._renderThumbnail.bind(this);
    this._randomGenerator = this._randomGenerator.bind(this);
    this._sessionNumber = this._sessionNumber.bind(this);
  }

  componentDidMount() {
    if (this.state.viewportChecked === false) {
      this._debouncedWindowSizeCheck();
    }
    window.addEventListener("resize", this._debouncedWindowSizeCheck);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this._debouncedWindowSizeCheck);
  }

  _debouncedWindowSizeCheck = debounce(() => {
    if (window.innerWidth !== this.state.viewportWidth) {
      this.setState({
        isMobile: window.innerWidth < 480,
        viewportWidth: window.innerWidth,
      });
    }
    if (this.state.viewportChecked === false) {
      this.setState({
        viewportChecked: true,
        viewportWidth: window.innerWidth,
      });
    }
  }, 500);

  _randomGenerator(seed) {
    var m = 25;
    var a = 11;
    var c = 17;

    var z = seed;
    return function () {
      z = (a * z + c) % m;
      return z / m;
    };
  }

  _renderThumbnail(project, index) {
    const isMobile = this.state.isMobile;
    const viewportChecked = this.state.viewportChecked;
    if (viewportChecked) {
      return (
        <ProjectThumbnail
          {...project}
          as="article"
          hover
          autoplay
          key={index}
          portrait={isMobile ? (project.featured ? true : false) : false}
        />
      );
    }
  }

  _sessionNumber() {
    if (sessionStorage.getItem("sessionSeed") === null) {
      sessionStorage.setItem(
        "sessionSeed",
        Math.floor(Math.random() * 1000) + 1
      );
    }

    const sessionSeed = sessionStorage.getItem("sessionSeed");
    return this._randomGenerator(sessionSeed);
  }

  render() {
    const maxFeaturedCount = this.state.isMobile ? 3 : 4;
    const maxRemainingCount = this.state.isMobile ? 6 : 8;
    const generator = this._sessionNumber();

    const randomizedDesignWork = Data.DesignWork.slice().sort(() => generator() - generator());
    const featuredProjects = randomizedDesignWork.filter((item) => item.featured === true);
    const featuredProjectsMax = featuredProjects.slice(0, maxFeaturedCount);
    const remainingFeaturedProjects = featuredProjects.slice(maxFeaturedCount,featuredProjects.lenght);
    const nonFeaturedProjects = randomizedDesignWork.filter((item) => item.featured === false);
    const remainingProjects = nonFeaturedProjects.concat(remainingFeaturedProjects);
    const remainingProjectsMax = remainingProjects.slice(0, maxRemainingCount);

    return (
      <Fragment>
        <Helmet>
          <title>Laura Sandoval — Work</title>
        </Helmet>

        <GlobalHeader sticky />
        <AccessibilityLabel as="h2">Selected Works</AccessibilityLabel>
        <Grid featured>
          {featuredProjectsMax.map((project, index) => {
            return this._renderThumbnail(project, index);
          })}
        </Grid>
        <Grid>
          {remainingProjectsMax.map((project, index) => {
            return this._renderThumbnail(project, index);
          })}
          {this.state.viewportChecked && (
            <RemainingItems
              itemsToShow={remainingProjects.slice(
                maxRemainingCount,
                remainingProjects.length
              )}
              as="article"
              remainingCount={
                remainingProjects.slice(
                  maxRemainingCount,
                  remainingProjects.length
                ).length
              }
            />
          )}
        </Grid>
      </Fragment>
    );
  }
}

export default DesignWork;
