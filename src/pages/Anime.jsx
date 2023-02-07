import React, { useEffect, useState } from 'react';
import { useFetching } from "../hooks/useFetching";
import AnimeService from "../API/AnimeService";
import AnimeList from "../components/AnimeList";
import Loader from "../components/UI/Loader/Loader";

const Anime = () => {
  const [anime, setAnime] = useState([]);

  const [fetchAnime, isAnimeLoading, animeError] = useFetching(async () => {
    const response = await AnimeService.getAll();
    setAnime(response.data.data);
  })

  useEffect(() => {
    fetchAnime();
  }, []);

  return (
    <div className="mx-auto mt-0 max-w-2xl px-4 py-8 sm:px-6 lg:max-w-7xl lg:px-8">
      {isAnimeLoading
        ? <Loader />
        : <AnimeList anime={anime} />
      }
    </div>
  );
};

export default Anime;