import React from 'react';
import AnimeItem from "./AnimeItem";

const AnimeList = ({anime}) => {
  return (
    <div className="mt-6 grid grid-cols-1 gap-y-24 gap-x-8 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-14">
        {anime.map(item =>
          <AnimeItem info={item} />
        )}
    </div>
  );
};

export default AnimeList;