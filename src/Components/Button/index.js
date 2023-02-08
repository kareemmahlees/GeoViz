import React from "react";
import "./Button.scss";

const Button = ({ children, type, disabled, loading, solid }) => {
  return (
    <button
      className={`main__button ${loading ? "loading" : ""}, ${
        solid ? "solid" : ""
      }`}
      disabled={disabled}
      type={type || "button"}
    >
      {loading ? "Loading..." : children}
    </button>
  );
};

export default Button;
