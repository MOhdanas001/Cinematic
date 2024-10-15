
import { response } from "express";
import AnimeData from "../models/animeModel.js";
import topRatedMovie from "../models/topRatedModel.js"

 export const animeData=async(req,res)=>{

    try{
    const animeList = await AnimeData.find();
    return res.status(200).json({
        success:true,
        animelist:animeList,

    })
    }
    catch{
        return res.status(404).json({
            success:false,
            message:"failed to fetch data"
    
    })
    }
} 
 export const topRatedMovies=async(req,res)=>{

    try{
    const topRatedMovies= await topRatedMovie.find();
    if(topRatedMovies){
        return res.status(200).json({
            success:true,
            topRatesMovies:topRatedMovies
        })
    }
    else{
        return res.status(200).json({
            success:false,
            message:"no record found"
        })
    }
    }
    catch{
    //     return res.status(404).json({
    //         success:false,
    //         message:"failed to fetch data"
    
    // })
    
    }

} 