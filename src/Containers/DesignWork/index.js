import React, { Fragment } from "react";
import Data from "../../Assets/design-work.json";
import Grid from "../../Components/Grid";
import ProjectThumbnail from "../../Components/ProjectThumbnail";
import AccessibilityLabel from "../../Components/AccessibilityLabel";
import GlobalHeader from "../../Components/GlobalHeader";
import { Helmet } from "react-helmet";

class DesignWork extends React.Component {
  constructor(props) {
    super(props);

    this._renderThumbnail = this._renderThumbnail.bind(this);
    this._randomGenerator = this._randomGenerator.bind(this);
    this._sessionNumber = this._sessionNumber.bind(this);
  }

  _randomGenerator(seed) {
      var m = 25;
      var a = 11;
      var c = 17;
  
      var z = seed;
      return function() {
        z = (a * z + c) % m;
        return z/m;
      }
  }

  _renderThumbnail(project, index) {
    return (
      <ProjectThumbnail
      {...project}
      as="article"
      hover
      key={index}
      />
      );
    }
    
    _sessionNumber() {
      if(sessionStorage.getItem("sessionSeed") === null) {
        sessionStorage.setItem("sessionSeed", Math.floor(Math.random() * 1000) + 1);
      }
      
      const sessionSeed = sessionStorage.getItem("sessionSeed");
      return this._randomGenerator(sessionSeed);
    }

  render() {

    const generator = this._sessionNumber();
    const randomizedDesignWork = Data.DesignWork.slice().sort(() => generator() - generator());
    const featuredProjects = randomizedDesignWork.filter(item => item.featured === true);
    const firstFourFeaturedProjects = featuredProjects.slice(0, 4);
    const remainingFeaturedProjects = featuredProjects.slice(4, featuredProjects.lenght);
    const nonFeaturedProjects = randomizedDesignWork.filter(item => item.featured === false);
    const remainingProjects = nonFeaturedProjects.concat(remainingFeaturedProjects);

    return (
      <Fragment>
        <Helmet>
          <title>Laura Sandoval — Work</title>
        </Helmet>
        
        <GlobalHeader sticky />
        <AccessibilityLabel as="h2">Selected Works</AccessibilityLabel>
        <Grid featured>
          {firstFourFeaturedProjects.map((project, index) => {
            return this._renderThumbnail(project, index);
          })}
        </Grid>
        <Grid>
          {remainingProjects.map((project, index) => {
            return this._renderThumbnail(project, index);
          })}
        </Grid>
      </Fragment>
    );
  }
}

export default DesignWork;
