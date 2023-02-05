import React, { useState } from "react";
import { Button, Input } from "../../Components";
import "./NewProject.scss";

const NewProject = () => {
  const [data, setData] = useState({});
  const resources = [
    {
      type: "text",
      id: "project_name",
      placeholder: "Project Name",
      checkTheValue: (value) => value?.length > 0,
      error: "This filed can't be empty!",
    },
    {
      type: "text",
      id: "project_description",
      placeholder: "Project Description",
      checkTheValue: (value) => value?.length > 0,
      error: "This filed can't be empty!",
    },
    {
      type: "text",
      id: "project_location",
      placeholder: "Project Location",
      checkTheValue: (value) => value?.length > 0,
      error: "This filed can't be empty!",
    },
  ];

  return (
    <div>
      <h2 className="page__title">Create New Project</h2>
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
        </div>
        <Button type="submit">Create</Button>
      </form>
    </div>
  );
};

export default NewProject;
