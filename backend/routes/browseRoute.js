import express from "express";
import { animeData, topRatedMovies } from "../controller/browseController";

const Router=express.Router();

Router.route('/anime-list').get(animeData);
Router.route('/topRated-list').get(topRatedMovies);

export default Router;