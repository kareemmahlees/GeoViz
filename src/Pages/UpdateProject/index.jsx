import React, { useState } from "react";
import { Button, Input } from "../../Components";
import { updateProject } from "../../redux/services";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const UpdateProject = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, singleProject } = useSelector(
    (state) => state?.projects
  );
  const [data, setData] = useState(singleProject);
  const [newData, setNewData] = useState({});
  const resources = [
    {
      type: "text",
      id: "name",
      placeholder: "Project Name",
      checkTheValue: (value) => value?.length > 0,
      error: "This filed can't be empty!",
    },
    {
      type: "text",
      id: "description",
      placeholder: "Project Description",
      checkTheValue: (value) => value?.length > 0,
      error: "This filed can't be empty!",
    },
    {
      type: "text",
      id: "location",
      placeholder: "Project Location",
      checkTheValue: (value) => value?.length > 0,
      error: "This filed can't be empty!",
    },
  ];

  return (
    <div>
      <h2 className="page__title">Update {singleProject?.name}</h2>
      <form
        className="form"
        onSubmit={async (e) => {
          e.preventDefault();
          await dispatch(
            updateProject({ data: newData, id: singleProject.id })
          ).then((res) => {
            if (res?.payload?.id) {
              navigate(`/projects/${res?.payload?.id}`);
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
            setNewData={setNewData}
            newData={newData}
            checkTheValue={input.checkTheValue}
            error={input.error}
            solid={true}
          />
        ))}
        {/* <div>
          <label htmlFor="user">User</label>
          <input
            onChange={(e) =>
              setData({
                ...data,
                rol: e.target.value,
              })
            }
            type="radio"
            name="rol"
            id="user"
            value="user"
          />
        </div>
        <div>
          <label htmlFor="administrator">Administrator</label>
          <input
            onChange={(e) =>
              setData({
                ...data,
                gender: e.target.value,
              })
            }
            type="radio"
            name="rol"
            id="administrator"
            value="administrator"
          />
        </div> */}
        {error && <p>Something wrong!</p>}
        <Button loading={loading} solid={true} type="submit">
          Update
        </Button>
      </form>
    </div>
  );
};

export default UpdateProject;
