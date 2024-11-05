import express from "express";
import { checkauth, login, logout, register } from "../controller/RegisterController.js";
import { addMyList, animeData, getAllMovies, getAllShows, getTvShows, latestMovies, removeMylist, topRatedMovies, viewMyList } from "../controller/browseController.js";
import { getUserData } from "../controller/adminController.js";
// import register, from "../controller/RegisterController.js"


const Router=express.Router();

Router.route('/register').post(register);
Router.route('/login').post(login);
Router.route('/logout').get(logout);
Router.route('/auth').get(checkauth);
Router.route('/anime-list').get(animeData);
Router.route('/topRated-list').get(topRatedMovies);
Router.route('/latest-list').get(latestMovies);

Router.route('/moive-all').get(getAllMovies);
Router.route('/tv-shows').get(getTvShows);
Router.route('/all-shows').get(getAllShows);
Router.route('/addMyList').post(addMyList);
Router.route('/viewMyList').get(viewMyList);
Router.route('/removeMylist').post(removeMylist);

//admin Routes
Router.route('/users-data').get(getUserData);

export default Router;