import React, { useEffect, useState } from "react";
import "./Player.css";
import back_arrow_icon from "../../assets/back_arrow_icon.png";
import { useNavigate, useParams } from "react-router-dom";

const Player = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [apiData, setApiData] = useState({
    name: "",
    key: "",
    published_at: "",
    type: ""
  });

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`
    }
  };

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
      .then(res => res.json())
      .then(res => {
        const videos = res.results || [];
        const trailer = videos.find(
          vid => vid.site === "YouTube" && vid.type === "Trailer"
        );
        setApiData(trailer || videos[0] || {
          name: "Trailer not available",
          key: "",
          published_at: "",
          type: ""
        });
      })
      .catch(err => console.error("API Error:", err));
  }, [id]);

  return (
    <div className="player">
      <button onClick={() => navigate("/")} className="back-button" aria-label="Go Back">
        <img src={back_arrow_icon} alt="Go Back Home" />
      </button>

      {apiData.key ? (
        <iframe
          src={`https://www.youtube.com/embed/${apiData.key}`}
          frameBorder="0"
          width="90%"
          height="90%"
          title="Trailer"
          allowFullScreen
        ></iframe>
      ) : (
        <p style={{ textAlign: "center", color: "#fff", marginTop: "2rem" }}>
          No trailer available.
        </p>
      )}

      <div className="player-info">
        <p>{apiData.published_at?.slice(0, 10)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </div>
    </div>
  );
};

export default Player;
