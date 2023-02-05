import React from "react";
import { Link } from "react-router-dom";
import { ProjectCard } from "../../Components";

import "./SingleProject.scss";

const SingleProject = () => {
  const data = [
    {
      id: 1,
      name: "well 1",
      location_x: "25615616",
      location_y: "25615616",
      KD: "21das61das",
      TD: "21das61das",
      Trajectory: "Deviated",
    },
    {
      id: 2,
      name: "Documents 2",
      location_x: "25615616",
      location_y: "25615616",
      KD: "21das61das",
      TD: "21das61das",
      Trajectory: "Vertical",
    },
    {
      id: 3,
      name: "Financial 2",
      location_x: "25615616",
      location_y: "25615616",
      KD: "21das61das",
      TD: "21das61das",
      Trajectory: "Deviated",
    },
    {
      id: 4,
      name: "Financial 2",
      location_x: "25615616",
      location_y: "25615616",
      KD: "21das61das",
      TD: "21das61das",
      Trajectory: "Deviated",
    },
    {
      id: 5,
      name: "Financial 2",
      location_x: "25615616",
      location_y: "25615616",
      KD: "21das61das",
      TD: "21das61das",
      Trajectory: "Deviated",
    },
  ];

  return (
    <div>
      <h2 className="page__title">Project One</h2>
      <div className="single__project__options">
        <Link
          to="add/well"
          className="project__main__button"
          state={{ name: "Well" }}
        >
          Well
        </Link>
        <Link
          to="add/seismic"
          className="project__main__button"
          state={{ name: "Seismic" }}
        >
          Seismic
        </Link>
        <Link
          to="add/documents"
          className="project__main__button"
          state={{ name: "Documents" }}
        >
          Documents
        </Link>
        <Link
          to="add/financial"
          className="project__main__button"
          state={{ name: "Financial" }}
        >
          Financial
        </Link>
        <Link
          to="add/other"
          className="project__main__button"
          state={{ name: "Other" }}
        >
          Other
        </Link>
      </div>
      <div className="line" />
      <h2 className="section__title">Associated Data</h2>
      {!data.length && (
        <p className="empty">There's no data associated into this project</p>
      )}
      <div className="projects__list">
        {data.map((project) => (
          <ProjectCard
            key={project.id}
            id={project.id}
            name={project.name}
            location_x={project.location_x}
            location_y={project.location_y}
            KD={project.KD}
            TD={project.TD}
            Trajectory={project.Trajectory}
          />
        ))}
      </div>
      <div className="line" />
      <Link to="/">Edit</Link>
      <button>Delete</button>
    </div>
  );
};

export default SingleProject;
