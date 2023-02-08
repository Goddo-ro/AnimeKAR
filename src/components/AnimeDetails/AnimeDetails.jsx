import React, { useEffect, useState } from 'react';
import classes from "./AnimeDetails.module.css";
import { divideByComma } from "../../utils/numberUtils";
import { makeParagraphs } from "../../utils/stringUtils";
import { useFetching } from "../../hooks/useFetching";
import AnimeService from "../../API/AnimeService";
import Loader from "../UI/Loader/Loader";
import CharactersList from "../CharactersList";
import { Link } from "react-router-dom";
import StaffList from "../StaffList";

const AnimeDetails = ({ anime }) => {
  const [characters, setCharacters] = useState([]);
  const [staff, setStaff] = useState([]);

  const [fetchCharacters, areCharactersLoading, errors] = useFetching(async (id) => {
    if (!id) return;
    const response = await AnimeService.getCharactersByAnimeId(id);
    setCharacters(response.data.data);
  })

  const [fetchStaff, areStaffFetshing, staffErrors] = useFetching(async (id) => {
    const response = await AnimeService.getStaffByAnimeId(id);
    setStaff(response.data.data)
  })

  useEffect(() => {
    fetchCharacters(anime.mal_id);
    fetchStaff(anime.mal_id);
  }, [])

  return (
    <div>
      <div className={classes.detailsStatistics}>
        <div className={classes.score}>
          <span className="bg-gray-800 text-gray-200 ">Score</span>
          <h2>{anime.score}</h2>
          <p>{divideByComma(anime.scored_by)} users</p>
        </div>
        <div>
          Ranked <span>#{anime.rank}</span>
        </div>
        <div>
          Popularity <span>#{anime.popularity}</span>
        </div>
        <div>
          Members <span>{divideByComma(anime.members)}</span>
        </div>
      </div>
      <section>
        <h3>Synopsis</h3>
        {
          makeParagraphs(anime.synopsis).map(paragraph => <p>{paragraph}</p>)
        }
      </section>
      <section>
        <h3>Background</h3>
        {
          makeParagraphs(anime.background).map(paragraph => <p>{paragraph}</p>)
        }
      </section>
      <section>
        <h3>Characters & Voice Actors</h3>
        { areCharactersLoading
          ? <Loader />
          : <CharactersList characters={characters} count={10} allActors={false} />
        }
      </section>
      <section>
        <h3>Staff</h3>
        { areStaffFetshing
          ? <Loader />
          : <StaffList staff={staff} count={4} />
        }
      </section>
    </div>
  );
};

export default AnimeDetails;