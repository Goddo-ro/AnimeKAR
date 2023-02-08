import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from "react-router-dom";
import { useFetching } from "../hooks/useFetching";
import AnimeService from "../API/AnimeService";
import Loader from "../components/UI/Loader/Loader";
import { getFormattedDate } from "../utils/dateFormating";
import { capitalize } from "../utils/stringUtils";
import { divideByComma } from "../utils/numberUtils";

const AnimeById = ({ children }) => {
  const params = useParams();
  const [anime, setAnime] = useState({});

  const navigation = [
    { name: 'Details', href: '/anime/' + params.id, current: true },
    { name: 'Characters & Staff', href: `/anime/${params.id}/characters`, current: false },
    { name: 'Episodes', href: `/anime/${params.id}/episodes`, current: false },
    { name: 'Videos', href: `/anime/${params.id}/characters`, current: false },
    { name: 'Stats', href: `/anime/${params.id}/characters`, current: false },
    { name: 'Reviews', href: `/anime/${params.id}/characters`, current: false },
    { name: 'Recommendations', href: `/anime/${params.id}/characters`, current: false },
    { name: 'Interest Stacks', href: `/anime/${params.id}/characters`, current: false },
    { name: 'News', href: `/anime/${params.id}/characters`, current: false },
    { name: 'Forum', href: `/anime/${params.id}/characters`, current: false },
    { name: 'Clubs', href: `/anime/${params.id}/characters`, current: false },
    { name: 'Pictures', href: `/anime/${params.id}/characters`, current: false },
    { name: 'More Info', href: `/anime/${params.id}/characters`, current: false },
  ]

  const childrenWithProps = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { anime });
    }
    return child;
  });

  const [fetchAnime, isLoading, errors] = useFetching(async (id) => {
    const response = await AnimeService.getById(id);
    setAnime(response.data.data);
  })

  useEffect(() => {
    fetchAnime(params.id);

    if (anime.title) {
      document.title = anime.title;
    }
  }, []);


  if (isLoading || !anime) {
    return <Loader/>;
  }

  const information_div = [
    { title: "Type", body: anime.type },
    { title: "Episodes", body: anime.episodes },
    { title: "Status", body: anime.status },
    { title: "Aired", body: `from ${getFormattedDate(anime.aired?.from)} to ${getFormattedDate(anime.aired?.to)}` },
    { title: "Premiered", body: `${anime.season && capitalize(anime.season)} ${anime.year}` },
    { title: "Broadcast", body: anime.broadcast?.string },
    { title: "Producers", body: anime.producers?.map(producer => producer.name).join(", ") },
    { title: "Licensors", body: anime.licensors?.map(licensor => licensor.name).join(", ") },
    { title: "Studios", body: anime.studios?.map(studio => studio.name).join(", ") },
    { title: "Source", body: anime.source },
    { title: "Genres", body: anime.genres?.map(genre => genre.name).join(", ") },
    { title: "Themes", body: anime.themes?.map(theme => theme.name).join(", ") },
    { title: "Duration", body: anime.duration },
    { title: "Rating", body: anime.rating }
  ];

  const statistics_div = [
    { title: "Score", body: `${anime.score} scored by ${divideByComma(anime.scored_by)} users` },
    { title: "Ranked", body: `#${anime.rank}` },
    { title: "Popularity", body: `#${anime.popularity}` },
    { title: "Members", body: divideByComma(anime.members) },
    { title: "Favorites", body: divideByComma(anime.favorites) },
  ]

  return (
    <div className="mt-6 p-20 max-w-7xl ml-auto mr-auto pt-4">
      <div className="anime-title-author bg-gray-700 text-white">
        <h2>{anime.title}</h2>
      </div>
      <div className="flex anime-info">
        <div className="anime-general-info border-gray-600 mr-2">
          <img src={anime.images?.jpg.large_image_url}/>
          <div className="anime-info-section">
            <h3>Alternative Titles</h3>
            {anime.titles?.map(title => {
              if (title.type === "Default") return;
              return <p className="text-gray-500">
                <span className="text-black">{title.type}</span>: {title.title}
              </p>
            })}
          </div>
          <div className="anime-info-section">
            <h3>Information</h3>
            {
              information_div.map(info =>
                <p className="text-gray-500">
                  <span className="text-black">{info.title}</span>: {info.body}
                </p>)
            }
          </div>
          <div className="anime-info-section">
            <h3>Statistics</h3>
            {
              statistics_div.map(info =>
                <p className="text-gray-500">
                  <span className="text-black">{info.title}</span>: {info.body}
                </p>)
            }
          </div>
        </div>
        <div className="content-section">
          <div className="content-section--links">
            {
              navigation.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={(navData) => (navData.isActive
                      ? "bg-gray-800 text-white"
                      : "text-gray-800 hover:bg-gray-800 hover:text-white") +
                    " text-sm font-medium content-section--link"}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </NavLink>
              ))
            }
          </div>
          {childrenWithProps}
        </div>
      </div>
    </div>
  );
};

export default AnimeById;