import React from "react";
import "./Button.scss";

const Button = ({ children, type, disabled, loading }) => {
  return (
    <button
      className={`main__button ${loading ? "loading" : ""}`}
      disabled={disabled}
      type={type || "button"}
    >
      {loading ? "laoding..." : children}
    </button>
  );
};

export default Button;
