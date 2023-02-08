import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ProjectCard } from "../../Components";
import { getProjectDetails, DeleteProject } from "../../redux/services";
import { useSelector, useDispatch } from "react-redux";

import "./SingleProject.scss";

const SingleProject = () => {
  const dispatch = useDispatch();
  const { singleProject, loading, deleteLoading } = useSelector(
    (state) => state.projects
  );
  const id = useParams().projectID;
  const navigate = useNavigate();
  // const data = [
  //   {
  //     id: 1,
  //     name: "well 1",
  //     location_x: "25615616",
  //     location_y: "25615616",
  //     KD: "21das61das",
  //     TD: "21das61das",
  //     Trajectory: "Deviated",
  //   },
  //   {
  //     id: 2,
  //     name: "Documents 2",
  //     location_x: "25615616",
  //     location_y: "25615616",
  //     KD: "21das61das",
  //     TD: "21das61das",
  //     Trajectory: "Vertical",
  //   },
  //   {
  //     id: 3,
  //     name: "Financial 2",
  //     location_x: "25615616",
  //     location_y: "25615616",
  //     KD: "21das61das",
  //     TD: "21das61das",
  //     Trajectory: "Deviated",
  //   },
  //   {
  //     id: 4,
  //     name: "Financial 2",
  //     location_x: "25615616",
  //     location_y: "25615616",
  //     KD: "21das61das",
  //     TD: "21das61das",
  //     Trajectory: "Deviated",
  //   },
  //   {
  //     id: 5,
  //     name: "Financial 2",
  //     location_x: "25615616",
  //     location_y: "25615616",
  //     KD: "21das61das",
  //     TD: "21das61das",
  //     Trajectory: "Deviated",
  //   },
  // ];

  useEffect(() => {
    if (id) {
      dispatch(getProjectDetails(id));
    }
  }, [dispatch, id]);

  if (singleProject?.error) {
    return <h1>Error...!</h1>;
  }

  if (loading) {
    return <h1>Loading...!</h1>;
  }
  return (
    <div>
      <h2 className="page__title">{singleProject?.name}</h2>
      <div className="single__project__options">
        <Link
          to="add/well"
          className="project__main__button"
          state={{ name: "Well", id: id }}
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
      {!singleProject?.wells?.length && (
        <p className="empty">There's no data associated into this project</p>
      )}
      <div className="projects__list">
        {singleProject?.wells.map((project) => (
          <ProjectCard
            key={project.id}
            id={project.id}
            name={project.name}
            location_x={project.x_location}
            location_y={project.y_location}
            KD={project.kb}
            TD={project.td}
            Trajectory={project.Trajectory}
          />
        ))}
      </div>
      <div className="line" />
      <Link to="edit">Edit</Link>
      <button
        onClick={async (e) => {
          await dispatch(DeleteProject(id)).then((res) => {
            if (!res?.payload?.error) {
              navigate("/projects");
            }
          });
        }}
      >
        {deleteLoading ? "deleting...!" : "Delete"}
      </button>
    </div>
  );
};

export default SingleProject;
