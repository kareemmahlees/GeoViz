import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import {
  AddLogs,
  Login,
  NewProject,
  Projects,
  Register,
  SingleLogs,
  SingleProject,
  SingleWell,
  UpdateLog,
  UpdateProject,
  UpdateWell,
  WellForm,
} from "./Pages";
import { useSelector } from "react-redux";
import Layout from "./Layout";

const App = () => {
  const token = useSelector((state) => state.auth.token);

  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to={token ? "projects" : "login"} />}
      />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route element={<Layout />}>
        <Route path="/projects" element={<Projects />} />
        <Route path="projects/:projectID" element={<SingleProject />} />
        <Route path="projects/:projectID/edit" element={<UpdateProject />} />
        <Route path="projects/:projectID/add/:wellID" element={<WellForm />} />
        <Route path="projects/:projectID/:wellID" element={<SingleWell />} />
        <Route
          path="projects/:projectID/:wellID/edit"
          element={<UpdateWell />}
        />
        <Route
          path="projects/:projectID/:wellID/add/:logsID"
          element={<AddLogs />}
        />
        <Route
          path="projects/:projectID/:wellID/:logsID"
          element={<SingleLogs />}
        />
        <Route
          path="projects/:projectID/:wellID/:logsID/edit"
          element={<UpdateLog />}
        />
        <Route path="/new-project" element={<NewProject />} />
      </Route>
    </Routes>
  );
};

export default App;
