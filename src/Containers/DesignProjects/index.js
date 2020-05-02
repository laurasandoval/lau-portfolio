import React, { Fragment } from "react";
import Data from "../../Assets/data.json";
import Grid from "../../Components/Grid";
import ProjectThumbnail from "../../Components/ProjectThumbnail";

function DesignProjects() {
  
  const randomizedPortfolioItems = Data.PortfolioItems.sort(() => Math.random() - Math.random());
  const featuredItems = randomizedPortfolioItems.filter(item => item.featured === true);
  const firstFourFeaturedItems = featuredItems.slice(0, 4);
  const remainingFeaturedItems = featuredItems.slice(4, featuredItems.lenght);
  const nonFeaturedItems = Data.PortfolioItems.filter(item => item.featured === false);
  const remainingItems = nonFeaturedItems.concat(remainingFeaturedItems);

  return (
    <Fragment>
      <Grid featured>
        {firstFourFeaturedItems.map((item, index) => {
          return (
            <ProjectThumbnail
              title={item.title}
              description={item.description}
              artwork_type={item.artwork_type}
              artwork_src={item.artwork_src}
              start_year={item.start_year}
              start_month={item.start_month}
              end_year={item.end_year}
              end_month={item.end_month}
              key={index}
            />
          );
        })}
      </Grid>
      <Grid>
        {remainingItems.map((item, index) => {
          return (
            <ProjectThumbnail
              title={item.title}
              description={item.description}
              artwork_type={item.artwork_type}
              artwork_src={item.artwork_src}
              start_year={item.start_year}
              start_month={item.start_month}
              end_year={item.end_year}
              end_month={item.end_month}
              key={index}
            />
          );
        })}
      </Grid>
    </Fragment>
  );
}

export default DesignProjects;
