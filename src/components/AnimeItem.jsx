import React from 'react';

const AnimeItem = ({info}) => {
  return (
    <div className="anime-item">
      <h2>{info.title}</h2>
    </div>
  );
};

export default AnimeItem;