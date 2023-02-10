import React, { useState } from "react";
import { Button, Input } from "../../Components";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateWell } from "../../redux/services";

const UpdateWell = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, details } = useSelector((state) => state.wells);
  const [data, setData] = useState(details || {});
  const [newData, setNewData] = useState({});

  console.log(details.id);

  const resources = [
    {
      type: "text",
      id: `name`,
      placeholder: `Name`,
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
      <h2 className="page__title">{details?.name || "Well"} Creation</h2>
      <form
        className="form"
        // onSubmit={async (e) => {
        //   e.preventDefault();
        //   await dispatch(updateWell({ newData, id: details.id })).then(
        //     (res) => {
        //       // if (res?.payload?.id) {
        //       //   navigate(
        //       //     `${location.pathname.slice(
        //       //       0,
        //       //       location.pathname.lastIndexOf("/")
        //       //     )}`
        //       //   );
        //       // }

        //     }
        //   );
        // }}
        onSubmit={async (e) => {
          e.preventDefault();
          await dispatch(updateWell({ data: newData, id: details?.id })).then(
            (res) => {
              if (res?.payload?.id) {
                navigate(
                  `/projects/${res.payload.project_id}/${res.payload.id}`
                );
              }
            }
          );
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
            setNewData={setNewData}
            newData={newData}
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
          Update
        </Button>
      </form>
    </div>
  );
};

export default UpdateWell;
