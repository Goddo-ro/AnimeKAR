import Anime from "../pages/Anime";
import { Navigate } from "react-router-dom";

export const routes = [
  {path: "/anime", element: <Anime />},
  {path: "*", element: <Navigate to={"/anime"} replace />}
]