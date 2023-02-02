import React, { useState } from "react";
import { Input, Button } from "../../Components";
import { useDispatch } from "react-redux";
import { register } from "../../redux/services";

import "./Register.scss";

const Register = () => {
  const [data, setData] = useState({});
  const dispatch = useDispatch();

  const resources = [
    {
      type: "text",
      id: "username",
      placeholder: "User Name",
      checkTheValue: (value) => value?.length > 0,
      error: "This filed can't be empty!",
    },
    {
      type: "email",
      id: "email",
      placeholder: "E-mail",
      checkTheValue: (value) => value?.includes("@"),
      error: "Email must includes '@'!",
    },
    {
      type: "password",
      id: "password",
      placeholder: "Password",
      checkTheValue: (value) => value?.length > 6,
      error: "error",
    },
    {
      type: "password",
      id: "confirm__password",
      placeholder: "Confirm Password",
      checkTheValue: (value) => value === data?.password,
      error: "Email must includes '@'!",
    },
  ];

  const addImageUserHandler = (input) => {
    let files = input.target.files;

    let reader = new FileReader();

    reader.onload = (e) => {
      setData({
        ...data,
        avatar: e.target.result,
      });
    };
    reader.readAsDataURL(files[0]);
  };

  let formValidation = false;
  if (
    data?.username !== "" &&
    data?.email?.includes("@") &&
    data?.password?.length > 6 &&
    data?.confirm__password === data?.password
  ) {
    formValidation = true;
  } else {
    formValidation = false;
  }

  return (
    <div className="register__page">
      <div className="clip-path"></div>
      <div className="form__container">
        <h1>Register</h1>
        <form
          className="form"
          onSubmit={(e) => {
            e.preventDefault();
            dispatch(register(data));
          }}
        >
          <label htmlFor="avatar" className="avatar">
            <img
              src={
                data.avatar ||
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSf8xdLG78TMYzKtF09m3yqmzo8-NmjgdxR3g&usqp=CAU"
              }
              alt=""
            />
          </label>
          <input
            type="file"
            id="avatar"
            accept="image/*"
            onChange={addImageUserHandler}
          />
          {resources.map((input) => (
            <Input
              key={input.id}
              id={input.id}
              type={input.type}
              placeholder={input.placeholder}
              data={data}
              setData={setData}
              checkTheValue={input.checkTheValue}
              error={input.error}
            />
          ))}
          <Button type="submit" disabled={!formValidation}>
            Register
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Register;
