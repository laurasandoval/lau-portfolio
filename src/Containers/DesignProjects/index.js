import React, { Fragment } from "react";
import Data from "../../Assets/data.json";
import Grid from "../../Components/Grid";
import ProjectThumbnail from "../../Components/ProjectThumbnail";

function DesignProjects() {
  const featuredItems = Data.PortfolioItems.filter(
    item => item.featured === true
  );
  const nonFeaturedItems = Data.PortfolioItems.filter(
    item => item.featured === false
  );

  return (
    <Fragment>
      <Grid featured>
        {featuredItems
          .slice(0, 4)
          .sort(() => Math.random() - Math.random())
          .map((item, index) => {
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
        {nonFeaturedItems
          .sort(() => Math.random() - Math.random())
          .map((item, index) => {
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
