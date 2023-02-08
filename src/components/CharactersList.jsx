import React from 'react';
import CharacterItem from "../CharacterItem/CharacterItem";

const CharactersList = ({characters, count, allActors}) => {
  return (
    <div className="characters relative">
      {
        characters.filter((char, i) => i < count).map((character, i) =>
          <CharacterItem isEven={i % 2 === 0}
                         key={character.character?.mal_id}
                         character={character}
                         allActors={allActors} />
        )
      }
    </div>
  );
};

export default CharactersList;