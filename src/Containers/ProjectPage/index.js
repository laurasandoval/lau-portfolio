import React from "react";
import GlobalHeader from "../../Components/GlobalHeader";

function ProjectPage(props) {
  return (
    <div>
      <GlobalHeader/>
      <h1>{props.project}</h1>
      <p>Hello there, the quick brown fox jumps over the lazy dog.</p>
    </div>
  );
}

export default ProjectPage;
