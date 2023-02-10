import React, { useEffect } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { ProjectCard } from "../../Components";
import { getWellDetails, deleteWell } from "../../redux/services";
import { useSelector, useDispatch } from "react-redux";
import { Error, Loading } from "../";

const SingleWell = () => {
  const dispatch = useDispatch();
  const { loading, details, deleteing, error, msg } = useSelector(
    (state) => state.wells
  );
  const id = useParams().wellID;
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (id) {
      dispatch(getWellDetails(id));
    }
  }, [dispatch, id]);

  if (error) return <Error />;

  if (loading) return <Loading />;

  return (
    <div>
      <h2 className="page__title">{details?.name}</h2>
      <div className="single__project__options">
        <Link
          to="add/lgos"
          className="project__main__button"
          state={{ name: "Logs", id }}
        >
          Logs
        </Link>
        <Link
          to="add/tops"
          className="project__main__button"
          state={{ name: "Tops", id }}
        >
          Tops
        </Link>
        <Link
          to="add/completions"
          className="project__main__button"
          state={{ name: "Completions", id }}
        >
          Completions
        </Link>
        <Link
          to="add/casing"
          className="project__main__button"
          state={{ name: "Casing", id }}
        >
          Casing
        </Link>
        <Link
          to="add/other"
          className="project__main__button"
          state={{ name: "Other", id }}
        >
          Other
        </Link>
      </div>
      <div className="line" />
      <h2 className="section__title">Associated Data</h2>
      {!details?.logs?.length && (
        <p className="empty">There's no data associated into this project</p>
      )}
      {details?.logs && (
        <div className="projects__list">
          {details?.logs.map((project) => (
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
      )}
      <div className="line" />
      <Link to="edit" className="main__button solid">
        Edit
      </Link>
      <button
        type="button"
        className="delete__button"
        onClick={async () => {
          await dispatch(deleteWell(id)).then((res) => {
            if (res?.error) {
              navigate(
                `/projects/${location.pathname.slice(
                  location.pathname.indexOf("/", 2) + 1,
                  location.pathname.lastIndexOf("/")
                )}`
              );
            }
          });
        }}
      >
        {deleteing ? "Deleting...!" : "Delete"}
      </button>
      {msg && <p>{msg.message}</p>}
    </div>
  );
};

export default SingleWell;
