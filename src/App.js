import './styles/App.css';
import { useEffect, useState } from "react";
import { useFetching } from "./hooks/useFetching";
import AnimeService from "./API/AnimeService";
import AnimeItem from "./components/AnimeItem";

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
    <div className="App">
      {anime.map(item =>
        <AnimeItem info={item} />
      )}
    </div>
  );
}

export default App;
