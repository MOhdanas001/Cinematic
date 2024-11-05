import React, { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../CSS/browse.css";
import { useNavigate } from "react-router-dom";
import { FaPlay } from "react-icons/fa";
import { MdInfoOutline } from "react-icons/md";
import { useSelector } from "react-redux";
import axios from "axios";
import { API_ENDPOINT } from "../utils/constant";
import useMovies from "../hooks/useMovies.js";
import useTopRatedMovies from "../hooks/useTopRatedMovies.js";
import useLatestMovies from "../hooks/useLatestMovies.js";
import useShows from "../hooks/useShows.js";
import { Carousel } from "react-responsive-carousel";
import Slider from "./SliderC.js";

function Browse() {
  const movies = useSelector((store) => store.movie);
  const navigate = useNavigate();
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  // Custom hooks to fetch data
  useMovies();
  useTopRatedMovies();
  useLatestMovies();
  useShows();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVideoPlaying(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get(`${API_ENDPOINT}/auth`, {
          withCredentials: true,
        });
        if (!response.data.success) {
          navigate("/login");
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
      }
    };

    checkAuth();
  }, [navigate]);

  const setting = {
    infiniteLoop: true,
    interval: 6000,
    showArrows: false,
    showStatus: false,
    autoPlay: true,
  };

  return (
    <>
      <Carousel {...setting}>
        <div className="hero relative" style={{ minHeight: "100vh" }}>
          {!isVideoPlaying ? (
            <img
              src="./dragon-ball.jpg"
              alt="background"
              className="background-image h-full w-full"
              style={{ position: "absolute", top: 0, left: 0, zIndex: 5 }}
            />
          ) : (
            <video
              src="./dbz-background.mp4"
              autoPlay
              muted
              loop
              className="absolute top-0 left-0 w-full h-full object-cover"
              style={{ zIndex: 5 }}
            />
          )}
          <div className="absolute container inline bottom-64 left-28 w-1/3 z-10">
            <div className="logo">
              <img
                src="./dbz-title.png"
                alt="title"
                className="h-[9rem] w-[18rem] shadow-inner"
              />
            </div>
            <div className="button flex space-x-5 mt-4 ml-3">
              <button className="flex justify-center items-center bg-slate-300 p-2 rounded-md px-6 font-bold bg-opacity-95 hover:scale-110 transform transition duration-300 ease-in-out">
                <span className="mr-2 font-extrabold">
                  <FaPlay />
                </span>
                Play
              </button>
              <button className="flex justify-center items-center bg-slate-300 backdrop-blur-md bg-opacity-50 p-2 rounded-md px-6 font-bold space-x-2 hover:scale-110 transform transition duration-300 ease-in-out">
                <span className="mt-[4px] mr-2 font-extrabold text-2xl">
                  <MdInfoOutline />
                </span>
                More info
              </button>
            </div>
          </div>
        </div>

        <div className="hero relative" style={{ minHeight: "100vh" }}>
          {!isVideoPlaying ? (
            <img
              src="./joker.jpg"
              alt="background"
              className="background-image h-full w-full"
              style={{ position: "absolute", top: 0, left: 0, zIndex: 5 }}
            />
          ) : (
            <div className="absolute top-0 left-0 w-full h-full z-10 bg-black">
             <iframe
  style={{
    position: "absolute",
    top: 0,
    left: 0,
    width: "100vw",   // Full viewport width
    height: "100vh",   // Full viewport height
    zIndex: 10,
    border: "none",    // CSS property to remove border
    margin: 0,         // Remove margin
    padding: 0         // Remove padding
  }}
  src="https://www.youtube.com/embed/_OKAwz2MsJs?si=0qGRWWhpMU85T6RQ&controls=0&autoplay=1&mute=1"
  title="YouTube video player"
  allow="accelerometer; autoplay;encrypted-media; "
  referrerPolicy="strict-origin-when-cross-origin"
  allowFullScreen
/>

            </div>
          )}
          <div className="absolute container inline bottom-64 left-28 w-1/3 z-20">
            <div className="logo">
              <img
                src="./Joker-title.png"
                alt="title"
                className="h-[7rem] w-[18rem] shadow-inner"
              />
            </div>
            <div className="button flex space-x-5 mt-4 ml-3">
              <button className="flex justify-center items-center bg-slate-300 p-2 rounded-md px-6 font-bold bg-opacity-95 hover:scale-110 transform transition duration-300 ease-in-out">
                <span className="mr-2 font-extrabold">
                  <FaPlay />
                </span>
                Play
              </button>
              <button className="flex justify-center items-center bg-slate-300 backdrop-blur-md bg-opacity-50 p-2 rounded-md px-6 font-bold space-x-2 hover:scale-110 transform transition duration-300 ease-in-out">
                <span className="mt-[4px] mr-2 font-extrabold text-2xl">
                  <MdInfoOutline />
                </span>
                More info
              </button>
            </div>
          </div>
        </div>
      </Carousel>

      <div className="bg-black">
        <Slider movies={movies.latestMovies} title={"POPULAR MOVIES"} />
        <Slider movies={movies.tvShows} title={"TV SHOWS"} />
        <Slider movies={movies.topRatedMovies} title={"TOP RATED MOVIES"} />
        <Slider
          movies={movies.moviesList}
          title={"ANIMATED MOVIES AND SHOWS"}
        />
      </div>
    </>
  );
}

export default Browse;
