import React, { Fragment } from "react";
import { Helmet } from "react-helmet";
import GlobalHeader from "../../Components/GlobalHeader";
import AccessibilityLabel from "../../Components/AccessibilityLabel";
import Grid from "../../Components/Grid";
import Data from "../../Assets/open-source-work.json";
import ProjectThumbnail from "../../Components/ProjectThumbnail";

function OpenSource() {
  return (
    <Fragment>
      <Helmet>
        <title>Open Source Projects — Laura Sandoval</title>
      </Helmet>
      <GlobalHeader sticky />
      <AccessibilityLabel as="h2">Selected Works</AccessibilityLabel>
      <Grid featured>
        {Data.OpenSourceWork.map((project, index) => {
          return (
            <ProjectThumbnail
              {...project}
              as="article"
              hover
              autoplay
              key={index}
              fadeIn
            />
          );
        })}
      </Grid>
    </Fragment>
  );
}

export default OpenSource;
