import React, { useEffect } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../CSS/browse.css";
import { useNavigate } from 'react-router-dom';
import { FaPlay } from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";

import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { API_ENDPOINT } from "../utils/constant"; 
import useMovies from "../hooks/useMovies.js";
import useTopRatedMovies from "../hooks/useTopRatedMovies.js";
import Slider from "./SliderC.js";



function Browse() {

  const movies=useSelector(store=>store.movie);
  const navigate=useNavigate();
  // const dispatch=useDispatch();
  useMovies();
  useTopRatedMovies();
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
    <>
    <div className="hero">
      <img src="./joker.jpg" alt="background" className="background-image h-[100vh] w-[100vw]"/>
      <div className="container absolute bottom-32 left-28">
         <div className="logo ">
          <img src="./Joker-title.png" alt="title" className="h-[7rem] w-[18rem]" />
         </div>
         <div className="button flex space-x-5">
               <button className="flex justify-center items-center bg-slate-300 p-3"><FaPlay /> Play</button>
               <button className="flex justify-center items- bg-slate-300 p-3"><AiOutlineInfoCircle />More info </button>
         </div>
      </div>
    </div>
    <Slider movies={movies.topRatedMovies}/>

    </>
  );
}

export default Browse;
