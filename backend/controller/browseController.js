
import { response } from "express";
import AnimeData from "../models/animeModel.js";

 export const animeData=async(req,res)=>{

    const animeList = await AnimeData.find({},'title');
  console.log("animeList:",animeList);
} 