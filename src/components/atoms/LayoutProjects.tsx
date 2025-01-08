import React from 'react';
import ProjectLists from './tables/projects/ProjectsList'


const LayoutProjects: React.FC = () => {
  return (
    <div className="pb-[14rem]"> 
        <ProjectLists/>
      <hr className="mb-8" />
    </div>
  );
};

export default LayoutProjects;
