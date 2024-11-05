import { createSlice } from "@reduxjs/toolkit";

const movieSlice=createSlice({
    name:"movies",
    initialState:{
        moviesList:null,
        topRatedMovies:null,
        latestMovies:null,
        allMovies:null,
        tvShows:null,
        allShows:null


    
    },
    reducers:{
        //action
        getMovies:(state,action)=>{
            state.moviesList=action.payload;
        },
        getTopRatedMovies:(state,action)=>{
            state.topRatedMovies=action.payload;
        },
        getLatestMovies:(state,action)=>{
            state.latestMovies=action.payload;
        },
        getAllMovies:(state,action)=>{
            state.allMovies=action.payload;
        },
        getShows:(state,action)=>{
            state.tvShows=action.payload;
        },
        getAllShows:(state,action)=>{
            state.allShows=action.payload;
        }

    }
});

export const {getMovies,getTopRatedMovies,getLatestMovies,getAllMovies,getShows,getAllShows}=movieSlice.actions;
export default movieSlice.reducer;