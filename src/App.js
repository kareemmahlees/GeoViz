import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Login, Projects, Register } from "./Pages";
import { useSelector } from "react-redux";

const App = () => {
  const token = useSelector((state) => state.auth.token);

  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to={token ? "projects" : "register"} />}
      />
      <Route path="/register" element={<Register />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default App;
