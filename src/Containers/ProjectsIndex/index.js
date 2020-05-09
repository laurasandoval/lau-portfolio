import React, { Suspense } from 'react';

function ProjectsIndex(props) {
  const ProjectPage = React.lazy(() => import(`../../Work/${props.project_src}`));

  return(
    <div>
      <Suspense fallback={<div>Loading…</div>}>
        <ProjectPage />
      </Suspense>
    </div>
  )
}

export default ProjectsIndex