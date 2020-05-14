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
      // if(sessionStorage.getItem("sessionSeed") === null) {
      //   console.log("No sessionSeed in sessionStorage.");
      //   sessionStorage.setItem("sessionSeed", Math.floor(Math.random() * 100) + 1);
      //   console.log("Created sessionSeed in sessionStorage.");
      //   console.log("sessionSeed: " + sessionStorage.getItem("sessionSeed"));
      // } else {
      //   console.log("A sessionSeed already exists in sessionStorage.");
      //   console.log("sessionSeed: " + sessionStorage.getItem("sessionSeed"));
      // }
      
      const sessionSeed = 1234;

      return this._randomGenerator(sessionSeed);
    }

  render() {
        
    const generator = this._sessionNumber();
    const randomizedDesignWork = Data.DesignWork.sort(() => generator() - generator());

    console.log("====== ORIGINAL ARRAY: ======");
    console.log(Data.DesignWork);
    
    console.log("====== SHUFFLED ARRAY: ======");
    console.log(randomizedDesignWork);

    console.log("====== generator() - generator() RESULT: ======");
    console.log(generator() - generator());
    
    // const featuredProjects = randomizedDesignWork.filter(item => item.featured === true);
    // const firstFourFeaturedProjects = featuredProjects.slice(0, 4);
    // const remainingFeaturedProjects = featuredProjects.slice(4, featuredProjects.lenght);
    // const nonFeaturedProjects = Data.DesignWork.filter(item => item.featured === false);
    // const remainingProjects = nonFeaturedProjects.concat(remainingFeaturedProjects);

    return (
      <Fragment>
        <Helmet>
          <title>Laura Sandoval — Work</title>
        </Helmet>
        
        <GlobalHeader sticky />
        <AccessibilityLabel as="h2">Selected Works</AccessibilityLabel>
        {/* <Grid featured>
          {firstFourFeaturedProjects.map((project, index) => {
            return this._renderThumbnail(project, index);
          })}
        </Grid> */}
        <Grid>
          {Data.DesignWork.map((project, index) => {
            return this._renderThumbnail(project, index);
          })}
        </Grid>
      </Fragment>
    );
  }
}

export default DesignWork;
