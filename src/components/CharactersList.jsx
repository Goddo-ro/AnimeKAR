import React from 'react';
import CharacterItem from "./CharacterItem";

const CharactersList = ({characters, count, allActors}) => {
  return (
    <div className="persons relative">
      {
        characters.filter((char, i) => i < count).map(character =>
          <CharacterItem key={character.character?.mal_id}
                         character={character}
                         allActors={allActors} />
        )
      }
    </div>
  );
};

export default CharactersList;