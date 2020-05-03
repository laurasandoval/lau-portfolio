import React, { Fragment } from "react";
import Data from "../../Assets/design-work.json";
import Grid from "../../Components/Grid";
import ProjectThumbnail from "../../Components/ProjectThumbnail";

function DesignWork() {
  
  const randomizedDesignWork = Data.DesignWork.sort(() => Math.random() - Math.random());
  const featuredProjects = randomizedDesignWork.filter(item => item.featured === true);
  const firstFourFeaturedProjects = featuredProjects.slice(0, 4);
  const remainingFeaturedProjects = featuredProjects.slice(4, featuredProjects.lenght);
  const nonFeaturedProjects = Data.DesignWork.filter(item => item.featured === false);
  const remainingProjects = nonFeaturedProjects.concat(remainingFeaturedProjects);

  return (
    <Fragment>
      <Grid featured>
        {firstFourFeaturedProjects.map((project, index) => {
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
        })}
      </Grid>
      <Grid>
        {remainingProjects.map((project, index) => {
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
        })}
      </Grid>
    </Fragment>
  );
}

export default DesignWork;
