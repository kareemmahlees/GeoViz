import React from "react";
import "./Button.scss";

const Button = ({ children, type, disabled }) => {
  return (
    <button
      className="main__button"
      disabled={disabled}
      type={type || "button"}
    >
      {children}
    </button>
  );
};

export default Button;
