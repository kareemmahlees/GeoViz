import React, { useState } from "react";
import { Input, Button } from "../Components";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/services";
import { useNavigate } from "react-router-dom";

import "./Register/Register.scss";

const Login = () => {
  const [data, setData] = useState({});
  const dispatch = useDispatch();
  const error = useSelector((state) => state.auth.error);
  const loading = useSelector((state) => state.auth.loading);
  const navigate = useNavigate();

  console.log(error);

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
  if (data?.email?.includes("@") && data?.password?.length > 7) {
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
          onSubmit={async (e) => {
            e.preventDefault();
            await dispatch(login(data)).then((res) => {
              if (res?.payload?.access_token) {
                navigate("/projects");
              }
            });
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
              messages={error?.message}
            />
          ))}
          {error && error.statusCode !== 400 && (
            <div style={{ position: "relative" }}>
              <p className="error">{error.message}</p>
            </div>
          )}
          <Button
            type="submit"
            // disabled={!formValidation}
            loading={loading}
          >
            Login
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
