import React, { useState } from "react";
import { BiShowAlt, BiHide } from "react-icons/bi";
import "./Input.scss";

const Input = ({
  id,
  type,
  placeholder,
  checkTheValue,
  data,
  setData,
  error,
  messages,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [inputBlur, setInputBlur] = useState(false);
  const enteredValueIsValid = checkTheValue && checkTheValue(data[id]);
  const errorInput = !enteredValueIsValid && inputBlur;

  return (
    <div className="input__control">
      <input
        type={
          type === "password"
            ? showPassword
              ? "text"
              : "password"
            : type || "text"
        }
        placeholder={placeholder}
        id={id}
        name={id}
        className="input"
        value={data[id] || ""}
        onChange={(e) =>
          setData({
            ...data,
            [id]: e.target.value,
          })
        }
        onBlur={() => {
          setInputBlur(true);
        }}
      />
      {type === "password" &&
        (showPassword ? (
          <BiHide
            className="show__pass"
            onClick={() => setShowPassword((prev) => !prev)}
          />
        ) : (
          <BiShowAlt
            className="show__pass"
            onClick={() => setShowPassword((prev) => !prev)}
          />
        ))}
      {error && errorInput && <p className="error">{error}</p>}
      {messages &&
        id === "email" &&
        messages.includes("email must be an email") && (
          <p className="error">email must be an email</p>
        )}
      {messages &&
        id === "phone" &&
        messages.includes("phone must be a valid phone number") && (
          <p className="error">phone must be a valid phone number</p>
        )}
    </div>
  );
};

export default Input;
