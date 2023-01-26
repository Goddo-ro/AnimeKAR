import './styles/App.css';
import { useEffect, useState } from "react";
import { useFetching } from "./hooks/useFetching";
import AnimeService from "./API/AnimeService";
import AnimeItem from "./components/AnimeItem";
import AnimeList from "./components/AnimeList";

function App() {
  const [anime, setAnime] = useState([]);

  const [fetchAnime, isAnimeLoading, animeError] = useFetching(async () => {
    const response = await AnimeService.getAll();
    setAnime(response.data.data);
  })

  useEffect(() => {
    fetchAnime();
  }, []);

  console.log(anime);

  return (
    <div className="App mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
      <AnimeList anime={anime} />
    </div>
  );
}

export default App;
