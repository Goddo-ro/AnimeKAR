import Anime from "../pages/Anime";
import { Navigate } from "react-router-dom";
import About from "../pages/About";

export const routes = [
  {path: "/anime", element: <Anime />},
  {path: "/about", element: <About />},
  {path: "*", element: <Navigate to={"/anime"} replace />}
]