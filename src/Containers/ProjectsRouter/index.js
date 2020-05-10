import React, { Suspense } from "react";
import ProjectPageFallback from "../../Components/ProjectPageFallback";

function ProjectsRouter(props) {
  const ProjectPage = React.lazy(() =>
    import(`../../Work/${props.project_src}`)
  );

  return (
    <div>
      {props.has_page ? (
        <Suspense fallback={<div>Loading…</div>}>
          <ProjectPage />
        </Suspense>
      ) : (
        <ProjectPageFallback {...props} />
      )}
    </div>
  );
}

export default ProjectsRouter;
