import React from "react";
import { Link } from "react-router-dom";
import { ProjectCard } from "../../Components";

import "./Projects.scss";

const Projects = () => {
  const projects = [
    {
      id: 1,
      name: "Project One",
      description: "Description Of Project one",
      location: "The Location",
      rol: "user",
    },
    {
      id: 2,
      name: "Project Two",
      description: "Description Of Project Two",
      location: "The Location",
      rol: "Administrator",
    },
    {
      id: 3,
      name: "Project Three",
      description: "Description Of Project Three",
      location: "The Location",
      rol: "user",
    },
    {
      id: 4,
      name: "Project Three",
      description: "Description Of Project Three",
      location: "The Location",
      rol: "user",
    },
    {
      id: 5,
      name: "Project Three",
      description: "Description Of Project Three",
      location: "The Location",
      rol: "user",
    },
  ];

  return (
    <div>
      <h2 className="page__title">Projects</h2>
      <Link to="/new-project" className="new__project__button">
        Create New Project
      </Link>
      <div className="line" />
      <h2 className="section__title">Existing Projects</h2>
      <div className="projects__list">
        {projects.map((project) => (
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
    </div>
  );
};

export default Projects;
