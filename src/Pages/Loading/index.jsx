import React from "react";

import "./Loading.scss";

const Loading = () => {
  return (
    <div className="spinne__container">
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loading;
