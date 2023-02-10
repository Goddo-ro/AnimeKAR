import React from 'react';
import { Route, Routes } from "react-router-dom";
import { routes } from "../router/routes";

const AppRouter = () => {
  return (
    <Routes>
      {routes.map(route =>
        <Route key={route.path + 1} path={route.path} element={route.element} />
      )}
    </Routes>
  );
};

export default AppRouter;