import React, { Suspense, Fragment } from "react";
import ProjectPageFallback from "../../Components/ProjectPageFallback";

function ProjectsRouter(props) {
  const ProjectPage = React.lazy(() => import(`../../Work/${props.src}`));

  return (
    <Fragment>
      {props.has_page ? (
        <Suspense fallback={<div>Loading…</div>}>
          <ProjectPage />
        </Suspense>
      ) : (
        <ProjectPageFallback {...props} />
      )}
    </Fragment>
  );
}

export default ProjectsRouter;
