import React, { useState } from "react";
import { Input, Button } from "../../Components";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../redux/services";

import "./Register.scss";

const Register = () => {
  const [data, setData] = useState({});
  const [avatar, setAvatar] = useState(
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSf8xdLG78TMYzKtF09m3yqmzo8-NmjgdxR3g&usqp=CAU"
  );
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.error);
  // const user = useSelector((state) => state.auth.user);

  const resources = [
    {
      type: "text",
      id: "first_name",
      placeholder: "First Name",
      checkTheValue: (value) => value?.length > 0,
      error: "This filed can't be empty!",
    },
    {
      type: "text",
      id: "last_name",
      placeholder: "Last Name",
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
      type: "text",
      id: "phone",
      placeholder: "Phone number",
      checkTheValue: (value) => value?.length > 7,
      error: "error",
    },
    {
      type: "password",
      id: "password",
      placeholder: "Password",
      checkTheValue: (value) => value?.length > 6,
      error: "error",
    },
    // {
    //   type: "password",
    //   id: "confirm__password",
    //   placeholder: "Confirm Password",
    //   checkTheValue: (value) => value === data?.password,
    //   error: "Email must includes '@'!",
    // },
  ];

  const addImageUserHandler = (input) => {
    let files = input.target.files;

    setData({
      ...data,
      avatar: input.target.files[0],
    });

    let reader = new FileReader();

    reader.onload = (e) => {
      setAvatar(e.target.result);
    };
    reader.readAsDataURL(files[0]);
  };

  let formValidation = false;
  if (
    data?.username !== "" &&
    data?.email?.includes("@") &&
    data?.password?.length > 7 &&
    data?.phone?.length > 6 &&
    data?.gender
  ) {
    formValidation = true;
  } else {
    formValidation = false;
  }

  return (
    <div className="register__page">
      {/* <div className="clip-path"></div> */}
      <div className="form__container">
        <h1>Register</h1>
        <form
          className="form"
          onSubmit={(e) => {
            e.preventDefault();
            // console.log(data);
            dispatch(register(data));
          }}
        >
          <label htmlFor="avatar" className="avatar">
            <img src={avatar} alt="" />
          </label>
          <input
            type="file"
            id="avatar"
            accept="image/*"
            onChange={addImageUserHandler}
          />
          <div className="user__name-inputs">
            {resources.slice(0, 2).map((input) => (
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
          </div>
          {resources.slice(2).map((input) => (
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
          <div style={{ position: "relative", marginBottom: "40px" }}>
            <div>
              <label htmlFor="male">Male</label>
              <input
                onChange={(e) =>
                  setData({
                    ...data,
                    gender: e.target.value,
                  })
                }
                type="radio"
                name="gender"
                id="male"
                value="male"
              />
            </div>
            <div>
              <label htmlFor="femal">Femal</label>
              <input
                onChange={(e) =>
                  setData({
                    ...data,
                    gender: e.target.value,
                  })
                }
                type="radio"
                name="gender"
                id="femal"
                value="femal"
              />
            </div>
            {!data.gender &&
              error?.message &&
              error?.message.includes(
                "gender must be one of the following values: male, female"
              ) && (
                <p className="error">
                  gender must be one of the following values: male, female
                </p>
              )}
          </div>
          {error && error.message === "User already registered" && (
            <>
              <p>{error.error}</p>
              <p>{error.message}</p>
            </>
          )}
          {error === true && <p>Something wrong!</p>}
          <Button
            type="submit"
            loading={loading}
            // disabled={!formValidation}
          >
            Register
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Register;
