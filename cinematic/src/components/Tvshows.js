import React, { useEffect, useState } from "react";
import useLatestMovies from "../hooks/useLatestMovies";
import { useDispatch, useSelector } from "react-redux";
import "../CSS/movies.css";
import axios from "axios";
import { API_ENDPOINT } from "../utils/constant";
import { getAllShows } from "../redux/movieSlice";


const limit=10;
 
const totalPageCalculator=(totalPages)=>{
  const pages=[];
  for(let x=1;x<=totalPages;x++){
    pages.push(x);
  }
  return pages;
}

const Tvshows = () => {

    const movies = useSelector((store) => store.movie);
    useLatestMovies();
    const dispatch= useDispatch();
    const [totalPage,setTotalPage]=useState(0);
    const [pageNo,setPageNo]=useState(1)
  
  
    useEffect(()=>{
       const fetchMovies= async()=>{
  
        try {
          const response= await axios.get(`${API_ENDPOINT}/all-shows`,{
            params: {
              page: pageNo,
              pageSize:limit,
            } 
          });
          const totalRecord=response.data.totalRecord;
      
          setTotalPage(Math.ceil(totalRecord/limit));
          console.log(response.data.movies);
          dispatch(getAllShows(response.data.movies));
  
        } catch (error) {
          
        }
       }
       fetchMovies();
    },[dispatch,pageNo]);
  
    //handle pagination by number
    const paginationHandler= (page)=>{
     setPageNo(page);
    }
  
    //go to previous page
    const previousHandler=()=>{
      setPageNo(pageNo-1);
    }
  
    //go to next page
    const nextHandler=()=>{
      setPageNo(pageNo+1);
    }
  
  return (
    <div className="bg-black flex flex-col space-y-4">
    <h1 className="text-white text-5xl font-extrabold text-center">TV Shows</h1>
    <div className="Movie-card-container grid grid-cols-5 gap-2 w-[90%] m-auto gap-y-9">
      {movies &&
      
        movies.allShows &&
        movies.allShows.length > 0 &&
        movies.allShows.map((movie, index) => (
          <div key={index} className="Movie-card hover:rounded-s-xl">
            <img
              src={movie.image}
              alt="movie-poster"
              className="w-[80%] h-60 rounded-md hover:scale-110 transition duration-300 ease-in-out"
            />
          </div>
        ))}
    </div>
    
<nav aria-label="Page-navigation !m-auto" >
<ul class="flex items-center -space-x-px h-20 text-base">
  <li>
    <button onClick={()=>previousHandler()} class="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
      <span class="sr-only">Previous</span>
      <svg class="w-3 h-3 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4"/>
      </svg>
    </button>
  </li>
  {totalPageCalculator(totalPage).map((page) => (
<li key={page}>
  <button 
    onClick={() => paginationHandler(page)} 
    className={`flex items-center justify-center px-4 h-10 leading-tight  bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white ${(pageNo === page) ? 'text-white bg-gray-700' : ''}`}
  >
    {page}
  </button>
</li>
))}

  <li>
    <button onClick={()=>nextHandler()} class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
      <span class="sr-only">Next</span>
      <svg class="w-3 h-3 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
      </svg>
    </button>
  </li>
</ul>
</nav>
</div>
  )
}

export default Tvshows