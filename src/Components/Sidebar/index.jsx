import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.scss";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="user__image">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRStVSkomz1_Gf_ryLP0hoU7YKEIIeak15WL08riro&s"
          alt=""
        />
      </div>
      <h3 className="user__name">User Name</h3>
      <ul className="links__list">
        <li>
          <Link className="link" to="/projects">
            Projects
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
