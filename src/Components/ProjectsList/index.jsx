import React from "react";
import ProjectCard from "../ProjectCard";

const ProjectsList = ({ projects, loading, error }) => {
  // if (error) {
  //   return <h1>Error</h1>;
  // }
  // if (loading) {
  //   return <h1>Loading</h1>;
  // }
  if (!projects?.length) {
    return <p>There Is no projects</p>;
  }

  return (
    <div className="projects__list">
      {projects?.map((project) => (
        <ProjectCard
          key={project.id}
          id={project.id}
          name={project.name}
          description={project.description}
          location={project.location}
          rol={project.rol}
        />
      ))}
    </div>
  );
};

export default ProjectsList;
