import { useDispatch } from "react-redux";
import { getMovies } from "../redux/movieSlice";
import axios from "axios";
import { useEffect } from "react";
import {API_ENDPOINT} from "../utils/constant.js"

const useMovies = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchMovies = async () => {
    
      const options = {
        method: "GET",
        url: "https://myanimelist.p.rapidapi.com/anime/top/all",
        params: { p: "1" },
        headers: {
          "x-rapidapi-key": "02a23e56d8msh98e82cc476a9c70p164c75jsn03a98f4f3c74",
          "x-rapidapi-host": "myanimelist.p.rapidapi.com",
        },
      };

      try {
        const response = await axios.request(`${API_ENDPOINT}/anime-list`);

        dispatch(getMovies(response.data.animelist));
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, [dispatch]); // Empty dependency array means this will run once on mount
};

export default useMovies;
