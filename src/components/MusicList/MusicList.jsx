import React from 'react';
import { FiMusic } from "react-icons/fi";
import "./MusicList.css";

const MusicList = ({music}) => {
  if (!music) return <></>;
  return (
    <div className="music">
      {music.map(comp =>
        <div className="flex items-center">
          <FiMusic className="mr-2" />
          {comp}
        </div>
      )}
    </div>
  );
};

export default MusicList;