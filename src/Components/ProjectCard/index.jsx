import React from "react";
import { Link } from "react-router-dom";

import "./ProjectCard.scss";

const ProjectCard = ({
  id,
  name,
  description,
  rol,
  location,
  location_x,
  location_y,
  KD,
  TD,
  Trajectory,
}) => {
  return (
    <Link to={`${id}`} className="project__card">
      <ul className="project__card__details">
        {name && <li>{name}</li>}
        {description && (
          <li>
            <span>Description: </span>
            {description}
          </li>
        )}
        {location && (
          <li>
            <span>Location: </span>
            {location}
          </li>
        )}
        {rol && <li>{rol}</li>}
        {location_x && (
          <li>
            <span>Location-x: </span>
            {location_x}
          </li>
        )}
        {location_y && (
          <li>
            <span>Location-y: </span>
            {location_y}
          </li>
        )}
        {KD && (
          <li>
            <span>KD: </span>
            {KD}
          </li>
        )}
        {TD && (
          <li>
            <span>TD: </span>
            {TD}
          </li>
        )}
        {Trajectory && <li>{Trajectory}</li>}
      </ul>
    </Link>
  );
};

export default ProjectCard;
