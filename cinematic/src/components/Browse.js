import React, { useEffect } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import "../CSS/browse.css";
import { useNavigate } from 'react-router-dom';
import Slider from "./Slider";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { API_ENDPOINT } from "../utils/constant"; 
import useMovies from "../hooks/useMovies.js";
import useTopRatedMovies from "../hooks/useTopRatedMovies.js";

function Browse() {

  const movies=useSelector(store=>store.movie);
  const navigate=useNavigate();
  // const dispatch=useDispatch();
  // useMovies();
  // useTopRatedMovies();
// console.log("hello");

  // useEffect(()=>{
  //   const checkAuth = async () => {
  //     try {
  //       const response = await axios.get(`${API_ENDPOINT}/auth`, {
  //         withCredentials: true,
  //       });
  //       if (!response.data.success) {
  //         navigate('/login');
  //         // console.log(response.data.success);
  //       }
  //     } catch (error) {
  //       console.error('Error checking authentication:', error);
  //     }
  //   };
  
  //   checkAuth();
  // }, [navigate]);


  return (
    <div className="bg-black">   
      <div className="crousel-container h-full">
      <Carousel
        showThumbs={false}
        infiniteLoop
        stopOnHover={true}
        swipeable={true}
        emulateTouch
        showStatus={false}
        showArrows={false}
        showIndicators={false}
        autoPlay={true}
        interval={3000}
      >
        <div className="relative">
          <img src="/joker.jpg" alt="not-found" className="h-full crsl-img" />
          <img
            src="/joker-title.png"
            alt="not-found"
            className=" absolute title top-52 right-40 h-24"
          />
        </div>
        <div>
          <img src="/endgame.jpg" alt="not-found" className="h-full crsl-img" />
          <img
            src="/Avengers_endgame_logo.png"
            alt="not-found"
            className=" absolute title top-52 right-40 h-24"
          />
        </div>
        <div>
          <img
            src="/spider-man.jpg"
            alt="not-found"
            className="h-full crsl-img"
          />
          <img
            src="/spiderman-title.png"
            alt="not-found"
            className=" absolute title top-52 right-40 h-36"
          />
        </div>
      </Carousel>
      <div>
        <Slider movies={movies.topRatedMovies} title={"Top Rated Movies"} content={1} />
        <Slider movies={movies.moviesList} title={"Animates Movies and Shows"} content={2} />
      </div>
    </div>
    </div>
  );
}

export default Browse;
