import React, { useState } from "react";
import { Input, Button } from "../Components";
import { useDispatch } from "react-redux";
import { login } from "../redux/services";

import "./Register/Register.scss";

const Login = () => {
  const [data, setData] = useState({});
  const dispatch = useDispatch();

  const resources = [
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
  ];

  let formValidation = false;
  if (data?.email?.includes("@") && data?.password?.length > 6) {
    formValidation = true;
  } else {
    formValidation = false;
  }

  return (
    <div className="register__page">
      <div className="clip-path"></div>
      <div className="form__container">
        <h1>Login</h1>
        <form
          className="form"
          onSubmit={(e) => {
            e.preventDefault();
            // console.log(data);
            dispatch(login(data));
          }}
        >
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
            Login
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
