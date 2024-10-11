import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getTopRatedMovies } from "../redux/movieSlice";

const useTopRatedMovies = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchTopRatedMovies = async () => {
      try {
        const options = {
          method: 'GET',
          url: 'https://tvshow.p.rapidapi.com/Movie/TopRated',
          params: {
            Page: '1',
            Language: 'en-US',
            Adult: 'true',
          },
          headers: {
            'x-rapidapi-key': '02a23e56d8msh98e82cc476a9c70p164c75jsn03a98f4f3c74',
            'x-rapidapi-host': 'tvshow.p.rapidapi.com',
          },
        };
        const response = await axios.request(options);
        dispatch(getTopRatedMovies(response.data));
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching top-rated movies:', error);
      }
    };

    fetchTopRatedMovies();
  }, [dispatch]); // Empty dependency array ensures it runs only once after mount
};

export default useTopRatedMovies;
