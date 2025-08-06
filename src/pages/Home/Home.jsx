import React from "react";
import "./Home.css";
import Navbar from "../../components/Navbar/Navbar";
import Hero_banner from "../../assets/hero_banner.jpg";
import hero_title from "../../assets/hero_title.png";
import play_icon from "../../assets/play_icon.png";
import info_icon from "../../assets/info_icon.png";
import TitleCard from "../../components/TitleCards/TitleCards";
import Footer from "../../components/Footer/Footer";

const Home = () => {
  return (
    <div className="home">
      <Navbar />
      <div className="hero">
        <img src={Hero_banner} alt="" className="banner-img" />
        <div className="hero-caption">
          <img src={hero_title} alt="" className="caption-imgs" />
          <p>
            Discovering his ties to a secret ancient order, a young man living
            in modern Istanbul embarks on a quest to save the city from an
            immortal enemy.
          </p>
          <div className="hero-buttons">
            <button className="button">
              <img src={play_icon} alt="" />
              Play
            </button>
            <button className="button dark-button">
              <img src={info_icon} alt="" />
              More Info
            </button>
          </div>
          <TitleCard  title={"Popular on PopcornTV"} category={"popular"} />
        </div>
      </div>
      <div className="more-cards">
        
        <TitleCard title={"Now Playing"} category={"now_playing"} />
        <TitleCard title={"Top Rated"} category={"top_rated"} />
        <TitleCard title={"Upcoming"} category={"upcoming"} />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
