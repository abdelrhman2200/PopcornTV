import React, { useEffect, useRef, useState } from "react";
import "./TitleCards.css";
import { Link } from "react-router-dom";

const TitleCard = ({ title, category }) => {
  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef();

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
    },
  };

  const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${
            category ? category : "now_playing"
          }?language=en-US&page=1`,
          options
        );
        const data = await response.json();
        setApiData(data.results);
      } catch (err) {
        console.error("API Error:", err);
      }
    };

    fetchData();
    const ref = cardsRef.current;
    if (ref) {
      ref.addEventListener("wheel", handleWheel);
    }

    // Cleanup
    return () => {
      if (ref) ref.removeEventListener("wheel", handleWheel);
    };
  }, [category]);

  return (
    <div className="title-cards">
      <h2>{title ? title : "Popular on PopcornTV"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index) => (
          <Link to={`/player/${card.id}`} className="card" key={index}>
            <div className="card-inner">
              <img
                src={`https://image.tmdb.org/t/p/w500${card.backdrop_path}`}
                alt={card.original_title}
              />
              <p>{card.original_title}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TitleCard;
