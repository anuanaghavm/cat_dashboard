import React from "react";
import { Route, Routes } from "react-router-dom";
import UserRoute from "./routes";
// import routconfig from './routes'

const Approutes = () => {
  return (
    <Routes>
      {UserRoute.map((route, index) => (
        <Route key={index} path={route.path} element={route.element} />
      ))}
    </Routes>
  );
};
export default Approutes;
