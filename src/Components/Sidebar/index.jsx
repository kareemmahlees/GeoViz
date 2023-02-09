import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import "./Sidebar.scss";

const Sidebar = () => {
  const { user } = useSelector((state) => state.auth);

  console.log(user);

  return (
    <div className="sidebar">
      <div className="user__image">
        <img
          src={
            localStorage.getItem("avatar") ||
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRStVSkomz1_Gf_ryLP0hoU7YKEIIeak15WL08riro&s"
          }
          alt=""
        />
      </div>
      <h3 className="user__name">
        {user.user_metadata.first_name} {user.user_metadata.last_name}
      </h3>
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
