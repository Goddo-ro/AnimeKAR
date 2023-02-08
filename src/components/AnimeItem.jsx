import React from 'react';
import { Link } from "react-router-dom";

const AnimeItem = ({ info }) => {
  return (
    <Link to={`/anime/${info.mal_id}`} className="anime-item group relative mb-20">
      <div className="anime-item__rating strip">{info.score}</div>
      <div
        className="min-h-85 aspect-w-1 aspect-h-1 h-full w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-85">
        <img src={info.images.jpg.large_image_url} className="h-full w-full object-center lg:h-full lg:w-full" />
      </div>
      <div className="flex justify-between">
        <div className="pl-1">
          <h3 className="anime-item__title strip text-lg font-medium text-gray-700 m-0">
            {info.title}
          </h3>
          <p className="anime-item__title strip text-sm text-gray-500">
            {info.title_japanese}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default AnimeItem;