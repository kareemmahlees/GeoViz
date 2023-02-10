import React from "react";
import { Link } from "react-router-dom";

import "./Error.scss";

const Error = () => {
  return (
    <div className="error__page">
      <p className="error__msg">Sorry, Something Wrong!</p>
      <Link className="main__button solid" to="/projects">
        Back To Home
      </Link>
    </div>
  );
};

export default Error;
