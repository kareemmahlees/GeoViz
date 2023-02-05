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
        {description && <li>{description}</li>}
        {location && <li>{location}</li>}
        {rol && <li>{rol}</li>}
        {location_x && <li>{location_x}</li>}
        {location_y && <li>{location_y}</li>}
        {KD && <li>{KD}</li>}
        {TD && <li>{TD}</li>}
        {Trajectory && <li>{Trajectory}</li>}
      </ul>
    </Link>
  );
};

export default ProjectCard;
