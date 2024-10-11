import express from "express";
import { checkauth, login, logout, register } from "../controller/RegisterController.js";
// import register, from "../controller/RegisterController.js"

const Router=express.Router();

Router.route('/register').post(register);
Router.route('/login').post(login);
Router.route('/logout').get(logout);
Router.route('/auth').get(checkauth);

export default Router;