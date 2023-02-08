import React, { useState } from "react";
import { Button, Input } from "../../Components";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createWell } from "../../redux/services";

import "./WellForm.scss";

const WellForm = () => {
  const [data, setData] = useState({
    trajectory: "well trajectory",
  });
  const location = useLocation();
  const { name, id } = location?.state;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.wells);
  const resources = [
    {
      type: "text",
      id: `name`,
      placeholder: `${name} Name`,
      checkTheValue: (value) => value?.length > 0,
      error: "This filed can't be empty!",
    },
    {
      type: "text",
      id: "x_location",
      placeholder: "X Location",
      checkTheValue: (value) => value?.length > 0,
      error: "This filed can't be empty!",
    },
    {
      type: "text",
      id: "y_location",
      placeholder: "Y Location",
      checkTheValue: (value) => value?.length > 0,
      error: "This filed can't be empty!",
    },
    {
      type: "text",
      id: "kb",
      placeholder: "KD",
      checkTheValue: (value) => value?.length > 0,
      error: "This filed can't be empty!",
    },
    {
      type: "text",
      id: "td",
      placeholder: "TD",
      checkTheValue: (value) => value?.length > 0,
      error: "This filed can't be empty!",
    },
  ];

  return (
    <div>
      <h2 className="page__title">{name || "Well"} Creation</h2>
      <form
        className="form"
        onSubmit={async (e) => {
          e.preventDefault();
          await dispatch(createWell({ data, id })).then((res) => {
            if (res?.payload?.id) {
              navigate(`/projects/${id}`);
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
            solid={true}
          />
        ))}
        {/* <div>
          <label htmlFor="vertical">Vertical</label>
          <input
            onChange={(e) =>
              setData({
                ...data,
                rol: e.target.value,
              })
            }
            type="radio"
            name="Trajectory"
            id="vertical"
            value="vertical"
          />
        </div>
        <div>
          <label htmlFor="deviated">Deviated</label>
          <input
            onChange={(e) =>
              setData({
                ...data,
                Trajectory: e.target.value,
              })
            }
            type="radio"
            name="Trajectory"
            id="deviated"
            value="deviated"
          />
        </div> */}
        <Button solid={true} type="submit" loading={loading}>
          Create
        </Button>
      </form>
    </div>
  );
};

export default WellForm;
