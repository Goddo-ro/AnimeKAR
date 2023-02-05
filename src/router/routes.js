import Anime from "../pages/Anime";
import { Navigate } from "react-router-dom";
import About from "../pages/About";
import AnimeById from "../pages/AnimeById";
import AnimeDetails from "../components/AnimeDetails";

export const routes = [
  { path: "/anime", element: <Anime/> },
  { path: "/anime/:id", element: <AnimeById><AnimeDetails /></AnimeById> },
  { path: "/about", element: <About/> },
  { path: "*", element: <Navigate to={"/anime"} replace/> }
]