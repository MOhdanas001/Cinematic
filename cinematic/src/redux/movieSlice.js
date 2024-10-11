import { createSlice } from "@reduxjs/toolkit";

const movieSlice=createSlice({
    name:"movies",
    initialState:{
        moviesList:null,
        topRatedMovies:null,

    
    },
    reducers:{
        //action
        getMovies:(state,action)=>{
            state.moviesList=action.payload;
        },
        getTopRatedMovies:(state,action)=>{
            state.topRatedMovies=action.payload;
        }
    }
});

export const {getMovies,getTopRatedMovies}=movieSlice.actions;
export default movieSlice.reducer;