import React from 'react';

const AnimeItem = ({ info }) => {
  return (
    <div className="anime-item group relative">
      <div className="anime-item__rating strip">{info.rating}</div>
      <div
        className="min-h-85 aspect-w-1 aspect-h-1 h-full w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-85">
        <img src={info.images.jpg.large_image_url} className="h-full w-full object-center lg:h-full lg:w-full" />
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="anime-item__title strip text-lg font-medium text-gray-700">
            {info.title}
          </h3>
          <p className="anime-item__title strip text-sm text-gray-500">
            {info.title_japanese}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AnimeItem;