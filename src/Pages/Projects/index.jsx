import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { ProjectCard, ProjectsList } from "../../Components";
import { useDispatch, useSelector } from "react-redux";

import "./Projects.scss";
import { getAllProjects } from "../../redux/services";
import { Loading, Error } from "../";

const Projects = () => {
  const { error, loading, projects } = useSelector((state) => state.projects);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProjects());
  }, [dispatch]);

  if (error) return <Error />;

  if (loading) return <Loading />;

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
