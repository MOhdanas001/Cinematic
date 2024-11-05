import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux"
import { API_ENDPOINT } from "../utils/constant";
import { getShows } from "../redux/movieSlice";


const useShows = ()=>{
 const dispatch=useDispatch();
 useEffect(()=>{
    const fetchShows=async()=>{

        try {
            const response=await axios.get(`${API_ENDPOINT}/tv-shows`);
            console.log(response);
            dispatch(getShows(response.data.shows));
        } catch (error) {
            console.log(error);
        }
    }
    fetchShows();
 },[dispatch])


}
export default useShows;