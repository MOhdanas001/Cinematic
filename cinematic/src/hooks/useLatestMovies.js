import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {API_ENDPOINT} from "../utils/constant.js"
import {getLatestMovies} from "../redux/movieSlice.js"

const useLatestMovies = () => {
  const dispatch = useDispatch();

  useEffect(() => {

    const fetchLatestMoives = async () => {

      try
      {

        // const url = "https://api.themoviedb.org/3/movie/popular?language=en-US&page=2";
        // const options = {
        //   method: "GET",
        //   headers: {
        //     accept: "application/json",
        //     Authorization:
        //       "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZWU2MDE2Mjc3MzFiNDI2MGU3OTg2OGM1OGQ4M2VmNiIsIm5iZiI6MTcyOTA2MzYwMy40MzE3MjQsInN1YiI6IjY3MDdhYjAzNjcxODAxMmZjMjMzYWQyZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.yW660GjBwQQ9UNduH53ZZt6QSaSRtU0Dr_ACg8sVCp0",
        //   },
        // };
        // const options = {
        //   method: 'GET',
        //   url: 'https://tvshow.p.rapidapi.com/Serie/OnTheAir',
        //   params: {
        //     Page: '3',
        //     Language: 'en-US',
        //     Adult: 'true'
        //   },
        //   headers: {
        //     'x-rapidapi-key': '02a23e56d8msh98e82cc476a9c70p164c75jsn03a98f4f3c74',
        //     'x-rapidapi-host': 'tvshow.p.rapidapi.com'
        //   }
        // };
        
        // const response= await axios(options);
        // console.log(response.data);
        const response = await axios.request(`${API_ENDPOINT}/latest-list`,{
          withCredentials:true,
        });
        dispatch(getLatestMovies(response.data.latestMovie));

      } 
      catch (error) 
      {
        console.log(error);
      }
    };
    fetchLatestMoives();
  }, [dispatch]);
};

export default useLatestMovies;
