import React from 'react';
import { Link } from "react-router-dom";
import "./RecItem.css";

const RecItem = ({element, width}) => {
  const entry = element.entry;
  return (
    <Link to={`/anime/${entry?.mal_id}`}>
      <div style={{width: width}} className="recItem">
        <p>{element.votes} users</p>
        <img src={entry.images?.jpg?.image_url} />
        <h5>{entry.title}</h5>
      </div>
    </Link>
  );
};

export default RecItem;