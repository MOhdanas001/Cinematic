import React, { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../CSS/browse.css";
import { useNavigate } from "react-router-dom";
import { FaPlay } from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { API_ENDPOINT } from "../utils/constant";
import useMovies from "../hooks/useMovies.js";
import useTopRatedMovies from "../hooks/useTopRatedMovies.js";
import Slider from "./SliderC.js";
import { MdInfoOutline } from "react-icons/md";
import useLatestMovies from "../hooks/useLatestMovies.js";
import useShows from "../hooks/useShows.js";
import { Carousel } from 'react-responsive-carousel';

function Browse() {
  const movies = useSelector((store) => store.movie);
  const navigate = useNavigate();

  // Set loading state

  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  // Custom hooks to fetch data
  useMovies();
  useTopRatedMovies();
  useLatestMovies();
  useShows();

  // Trigger the video to play after 1 second
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVideoPlaying(true);
    }, 2000); // 2 seconds delay

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get(`${API_ENDPOINT}/auth`, {
          withCredentials: true,
        });
        if (!response.data.success) {
          navigate('/login');
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
      }
    };

    checkAuth();
  },[navigate]);

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
      <div className="hero">
          {!isVideoPlaying ? (
            <img
              src="./dragon-ball.jpg"
              alt="background"
              className="background-image h-[100vh] w-[100vw]s"
            />
          ) : ( <video src="./dbz-background.mp4"  autoPlay muted ></video>
          )}
          <div className="absolute container inline bottom-64 left-28 w-1/3">
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
        <div className="hero">
          {!isVideoPlaying ? (
            <img
              src="./joker.jpg"
              alt="background"
              className="background-image h-[100vh] w-[100vw]"
            />
          ) : ( <video src="./videoplayback.webm" autoPlay muted ></video>
          )}
          <div className="absolute container inline bottom-64 left-28 w-1/3">
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
        <Slider movies={movies.moviesList} title={"ANIMATED MOVIES AND SHOWS"} />
      </div>
    </>
  );
}

export default Browse;
