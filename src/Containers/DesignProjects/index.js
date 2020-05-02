import React from "react";
import Data from "../../_data/data.json";
import Grid from "../../Components/Grid";
import ProjectThumbnail from "../../Components/ProjectThumbnail";

function DesignProjects() {
  const featuredItems = Data.PortfolioItems.filter(
    item => item.featured === true
  );

  return (
    <Grid>
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
              key={index}
            />
          );
        })}
    </Grid>
  );
}

export default DesignProjects;
