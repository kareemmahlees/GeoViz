import React, { useState } from "react";
import { Button, Input } from "../../Components";
import { useLocation } from "react-router-dom";

import "./WellForm.scss";

const WellForm = () => {
  const [data, setData] = useState({});
  const location = useLocation();
  const name = location.state?.name;
  const resources = [
    {
      type: "text",
      id: `${name}_name`,
      placeholder: `${name} Name`,
      checkTheValue: (value) => value?.length > 0,
      error: "This filed can't be empty!",
    },
    {
      type: "text",
      id: "location_x",
      placeholder: "X Location",
      checkTheValue: (value) => value?.length > 0,
      error: "This filed can't be empty!",
    },
    {
      type: "text",
      id: "location_y",
      placeholder: "Y Location",
      checkTheValue: (value) => value?.length > 0,
      error: "This filed can't be empty!",
    },
    {
      type: "text",
      id: "KD",
      placeholder: "KD",
      checkTheValue: (value) => value?.length > 0,
      error: "This filed can't be empty!",
    },
    {
      type: "text",
      id: "TD",
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
        onSubmit={(e) => {
          e.preventDefault();
          console.log(data);
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
        <div>
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
        </div>
        <Button type="submit">Create</Button>
      </form>
    </div>
  );
};

export default WellForm;
