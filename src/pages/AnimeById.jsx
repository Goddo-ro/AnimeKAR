import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from "react-router-dom";
import { useFetching } from "../hooks/useFetching";
import AnimeService from "../API/AnimeService";
import Loader from "../components/UI/Loader/Loader";
import { getFormattedDate } from "../utils/dateFormating";
import { capitalize } from "../utils/stringUtils";

const AnimeById = ({ children }) => {
  const params = useParams();
  const [anime, setAnime] = useState({});

  const navigation = [
    { name: 'Details', href: '/anime/' + params.id, current: true },
    { name: 'Characters & Staff', href: `/anime/${params.id}/characters`, current: false },
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
    { title: "Score", body: `${anime.score} scored by ${anime.scored_by} users` },
    { title: "Ranked", body: `#${anime.rank}` },
    { title: "Popularity", body: `#${anime.popularity}` },
    { title: "Members", body: anime.members },
    { title: "Favorites", body: anime.favorites },
  ]

  return (
    <div className="mt-6 p-20">
      <div className="anime-title-author bg-blue-300">
        <h2>{anime.title}</h2>
      </div>
      <div className="flex">
        <div className="anime-general-info border-r-2 border-gray-600 mr-2 pr-2">
          <img src={anime.images?.jpg.large_image_url}/>
          <div className="anime-info-section">
            <h3>Alternative Titles</h3>
            {anime.titles?.map(title => {
              if (title.type === "Default") return;
              return <p className="text-gray-500">
                <a className="text-gray-800">{title.type}</a>: {title.title}
              </p>
            })}
          </div>
          <div className="anime-info-section">
            <h3>Information</h3>
            {
              information_div.map(info =>
                <p className="text-gray-500">
                  <a className="text-gray-800">{info.title}</a>: {info.body}
                </p>)
            }
          </div>
          <div className="anime-info-section">
            <h3>Statistics</h3>
            {
              statistics_div.map(info =>
                <p className="text-gray-500">
                  <a className="text-gray-800">{info.title}</a>: {info.body}
                </p>)
            }
          </div>
        </div>
        <div>
          {
            navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={(navData) => (navData.isActive
                    ? "bg-gray-800 text-white"
                    : "text-gray-800 hover:bg-gray-800 hover:text-white") +
                  " px-3 py-1 text-sm font-medium mr-2"}
                aria-current={item.current ? 'page' : undefined}
              >
                {item.name}
              </NavLink>
            ))
          }
          {childrenWithProps}
        </div>
      </div>
    </div>
  );
};

export default AnimeById;