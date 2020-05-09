import React, { Fragment } from "react";
import Data from "../../Assets/design-work.json";
import Grid from "../../Components/Grid";
import ProjectThumbnail from "../../Components/ProjectThumbnail";
import AccessibilityLabel from "../../Components/AccessibilityLabel";
import GlobalHeader from "../../Components/GlobalHeader";

class DesignWork extends React.Component {
  constructor(props) {
    super(props);

    this._renderThumbnail = this._renderThumbnail.bind(this);
  }

  _renderThumbnail(project, index) {
    return (
      <ProjectThumbnail
        title={project.title}
        client={project.client}
        description={project.description}
        start_year={project.start_year}
        start_month={project.start_month}
        end_year={project.end_year}
        end_month={project.end_month}
        featured={project.featured}
        src={project.src}
        thumbnails={project.thumbnails}
        key={index}
      />
    );
  }

  render() {
    const randomizedDesignWork = Data.DesignWork.sort(() => Math.random() - Math.random());
    const featuredProjects = randomizedDesignWork.filter(item => item.featured === true);
    const firstFourFeaturedProjects = featuredProjects.slice(0, 4);
    const remainingFeaturedProjects = featuredProjects.slice(4, featuredProjects.lenght);
    const nonFeaturedProjects = Data.DesignWork.filter(item => item.featured === false);
    const remainingProjects = nonFeaturedProjects.concat(remainingFeaturedProjects);

    return (
      <Fragment>
        <GlobalHeader />
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
