import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { ProjectCard, ProjectsList } from "../../Components";
import { useDispatch, useSelector } from "react-redux";

import "./Projects.scss";
import { getAllProjects } from "../../redux/services";

const Projects = () => {
  // const projects = [
  //   {
  //     id: 1,
  //     name: "Project One",
  //     description: "Description Of Project one",
  //     location: "The Location",
  //     rol: "user",
  //   },
  //   {
  //     id: 2,
  //     name: "Project Two",
  //     description: "Description Of Project Two",
  //     location: "The Location",
  //     rol: "Administrator",
  //   },
  //   {
  //     id: 3,
  //     name: "Project Three",
  //     description: "Description Of Project Three",
  //     location: "The Location",
  //     rol: "user",
  //   },
  //   {
  //     id: 4,
  //     name: "Project Three",
  //     description: "Description Of Project Three",
  //     location: "The Location",
  //     rol: "user",
  //   },
  //   {
  //     id: 5,
  //     name: "Project Three",
  //     description: "Description Of Project Three",
  //     location: "The Location",
  //     rol: "user",
  //   },
  // ];

  const { error, loading, projects } = useSelector((state) => state.projects);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProjects());
  }, [dispatch]);

  return (
    <div>
      <h2 className="page__title">Projects</h2>
      <Link to="/new-project" className="new__project__button">
        Create New Project
      </Link>
      <div className="line" />
      <h2 className="section__title">Existing Projects</h2>
      <ProjectsList projects={projects} loading={loading} error={error} />
    </div>
  );
};

export default Projects;
