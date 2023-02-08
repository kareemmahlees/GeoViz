import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ProjectCard } from "../../Components";
import { getWellDetails } from "../../redux/services";
import { useSelector, useDispatch } from "react-redux";

const SingleWell = () => {
  const dispatch = useDispatch();
  const { loading, details } = useSelector((state) => state.wells);
  const id = useParams().wellID;
  const data = [
    {
      id: 1,
      name: "Logs",
      // location_x: "25615616",
      // location_y: "25615616",
      // KD: "21das61das",
      // TD: "21das61das",
      // Trajectory: "Deviated",
    },
    {
      id: 2,
      name: "Tops",
      // location_x: "25615616",
      // location_y: "25615616",
      // KD: "21das61das",
      // TD: "21das61das",
      // Trajectory: "Vertical",
    },
    {
      id: 3,
      name: "Completions",
      // location_x: "25615616",
      // location_y: "25615616",
      // KD: "21das61das",
      // TD: "21das61das",
      // Trajectory: "Deviated",
    },
    {
      id: 4,
      name: "Casing",
      // location_x: "25615616",
      // location_y: "25615616",
      // KD: "21das61das",
      // TD: "21das61das",
      // Trajectory: "Deviated",
    },
    {
      id: 5,
      name: "Other",
      // location_x: "25615616",
      // location_y: "25615616",
      // KD: "21das61das",
      // TD: "21das61das",
      // Trajectory: "Deviated",
    },
  ];

  useEffect(() => {
    if (id) {
      dispatch(getWellDetails(id));
    }
  }, [dispatch, id]);

  // if (singleProject?.error) {
  //   return <h1>Error...!</h1>;
  // }

  if (loading) {
    return <h1>Loading...!</h1>;
  }

  console.log(details);

  return (
    <div>
      <h2 className="page__title">{details?.name}</h2>
      <div className="single__project__options">
        <Link
          to="add/lgos"
          className="project__main__button"
          state={{ name: "Logs" }}
        >
          Logs
        </Link>
        <Link
          to="add/tops"
          className="project__main__button"
          state={{ name: "Tops" }}
        >
          Tops
        </Link>
        <Link
          to="add/completions"
          className="project__main__button"
          state={{ name: "Completions" }}
        >
          Completions
        </Link>
        <Link
          to="add/casing"
          className="project__main__button"
          state={{ name: "Casing" }}
        >
          Casing
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

export default SingleWell;
