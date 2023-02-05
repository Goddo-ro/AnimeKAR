import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from "react-router-dom";
import { useFetching } from "../hooks/useFetching";
import AnimeService from "../API/AnimeService";
import Loader from "../components/UI/Loader/Loader";
import { getFormattedDate } from "../utils/dateFormating";

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
    { title: "Aired", body: `from ${getFormattedDate(anime.aired?.from)} to ${getFormattedDate(anime.aired?.to)}` }
  ]

  return (
    <div className="mt-6 p-20">
      <div className="anime-title-author bg-blue-300">
        <h2>{anime.title}</h2>
      </div>
      <div className="flex">
        <div className="border-r-2 border-gray-600 mr-2 pr-2">
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