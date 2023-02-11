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
import MusicList from "../MusicList/MusicList";
import Reviews from "../Reviews";
import Carousel from "../UI/Carousel/Carousel";
import RecItem from "../RecItem/RecItem";
import CarouselButton from "../UI/CarouselButton/CarouselButton";

const AnimeDetails = ({ anime }) => {
  const [characters, setCharacters] = useState([]);
  const [staff, setStaff] = useState([]);
  const [themes, setThemes] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [recs, setRecs] = useState([]);

  const [fetchCharacters, areCharactersLoading, charactersErrors] = useFetching(async (id) => {
    const response = await AnimeService.getCharactersByAnimeId(id);
    setCharacters(response.data.data);
  });

  const [fetchStaff, areStaffFetching, staffErrors] = useFetching(async (id) => {
    const response = await AnimeService.getStaffByAnimeId(id);
    setStaff(response.data.data)
  });

  const [fetchThemes, areThemesFetching, themesErrors] = useFetching(async (id) => {
    const response = await AnimeService.getThemesByAnimeId(id);
    setThemes(response.data.data);
  });

  const [fetchReviews, areReviewsFetching, reviewsErrors] = useFetching(async (id) => {
    const response = await AnimeService.getReviewsByAnimeId(id);
    setReviews(response.data.data);
  });

  const [fetchRecs, areRecsLoading, recsErrors] = useFetching(async (id) => {
    const response = await AnimeService.getAnimeRecommendations(id);
    setRecs(response.data.data)
  });

  /**
   * I am using timeouts because api that I am using has limits.
   * Due to multiple fetching I have to use the api several times a second,
   * because of that I have to do this strange thing.
  **/
  useEffect(() => {
    setTimeout(() => {
      fetchCharacters(anime.mal_id);
    }, 1000)
    setTimeout(() => {
      fetchStaff(anime.mal_id);
    }, 2001);
    setTimeout(() => {
      fetchThemes(anime.mal_id);
    }, 3001);
    setTimeout(() => {
      fetchReviews(anime.mal_id);
    }, 4001);
    setTimeout(() => {
      fetchRecs(anime.mal_id);
    }, 5001);
  }, [])

  if (charactersErrors) fetchCharacters(anime.mal_id);
  if (staffErrors) fetchStaff(anime.mal_id);
  if (themesErrors) fetchThemes(anime.mal_id);
  if (reviewsErrors) fetchReviews(anime.mal_id);
  if (recsErrors) fetchRecs(anime.mal_id);

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
      {anime.background &&
        <section>
          <h3>Background</h3>
          {
            makeParagraphs(anime.background).map(paragraph => <p>{paragraph}</p>)
          }
        </section>
      }
      <section>
        <h3>Characters & Voice Actors</h3>
        { areCharactersLoading
          ? <Loader />
          : <CharactersList characters={characters} count={10} allActors={false} />
        }
      </section>
      <section>
        <h3>Staff</h3>
        { areStaffFetching
          ? <Loader />
          : <StaffList staff={staff} count={4} />
        }
      </section>
      <section className="flex justify-between gap-6">
        <div className="w-6/12">
          <h3>Opening Theme</h3>
          { areThemesFetching
            ? <Loader />
            : <MusicList music={themes.openings} />
          }
        </div>
        <div>
          <h3>Ending Theme</h3>
          { areThemesFetching
            ? <Loader />
            : <MusicList music={themes.endings} />
          }
        </div>
      </section>
      <section>
        <h3>Reviews</h3>
        { areReviewsFetching
          ? <Loader />
          : <Reviews reviews={reviews} count={3} />
        }
      </section>
      <section>
        <h3>Recommendations</h3>
        { areRecsLoading
          ? <Loader/>
          : <div className="h-30 flex carousel-container">
              <Carousel elements={recs}
                          count={21}
                          elementReturner={(data) => {
                            return <RecItem key={data.element?.entry?.mal_id} element={data.element} width={data.width} />
                          }}
                          elementWidth={100} />
              <CarouselButton link={"/recs"} width={100} />
            </div>
        }
      </section>
    </div>
  );
};

export default AnimeDetails;