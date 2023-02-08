import React from 'react';
import "../styles/Person.css"
import { Link } from "react-router-dom";

const CharacterItem = ({character, allActors}) => {
  return (
    <div className="personContainer">
      <div key={character.mal_id} className="person">
        <div className="personLeft">
          <Link><img className="w-10" src={character.character?.images?.jpg?.image_url} /></Link>
          <Link>{character.character?.name}</Link>
          <h5>{character.role}</h5>
        </div>
        <div className="personRight">
          {
            character.voice_actors?.filter((actor, i) => allActors ? true : i === 0).map(actor =>
              <>
                <Link><img src={actor.person?.images?.jpg?.image_url} className="w-10"/></Link>
                <Link>{actor.person?.name}</Link>
                <h5>{actor.language}</h5>
              </>
            )
          }
        </div>
      </div>
    </div>
  );
};

export default CharacterItem;