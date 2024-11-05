import { response } from "express";
import AnimeData from "../models/animeModel.js";
import topRatedMovie from "../models/topRatedModel.js";
import MovieLatest from "../models/latestMovieModel.js";
import TVShow from "../models/tvShowsModel.js";
import { User } from "../models/userModel.js";
import { Mylist } from "../models/mylistModel.js";
import jwt from "jsonwebtoken";

// import Tvshows from "../../cinematic/src/components/Tvshows.js";

//get Animated series Data
export const animeData = async (req, res) => {
  try {
    const animeList = await AnimeData.find({}).limit(18);
    return res.status(200).json({
      success: true,
      animelist: animeList,
    });
  } catch {
    return res.status(404).json({
      success: false,
      message: "failed to fetch data",
    });
  }
};

//fetch The Top rated Movies
export const topRatedMovies = async (req, res) => {
  try {
    const topRatedMovies = await topRatedMovie.find({}).limit(18);
    if (topRatedMovies) {
      return res.status(200).json({
        success: true,
        topRatesMovies: topRatedMovies,
      });
    } else {
      return res.status(200).json({
        success: false,
        message: "no record found",
      });
    }
  } catch {
    //     return res.status(404).json({
    //         success:false,
    //         message:"failed to fetch data"
    // })
  }
};

export const latestMovies = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res
        .status(200)
        .json({ message: "No token provided", success: false });
    }

    const decoded = jwt.verify(token, "kdhbskryedvgdssdcds");
    const user = await User.findById(decoded.userId);

    const latestMovieList = await MovieLatest.find({}).limit(18);
    const usersList = await Mylist.find({ userId: user._id });

    const userMovieIds = new Set(
      usersList.map((item) => item.movieId.toString())
    );

    const latestMovieListUpdated = latestMovieList.map((movie) => ({
      ...movie.toObject(),
      mylist: userMovieIds.has(movie._id.toString()),
    }));

    if (!latestMovieList) {
      return res.status(200).json({
        success: false,
        message: "failed to fetch latest Movies",
      });
    }

    return res.status(200).json({
      success: true,
      latestMovie: latestMovieListUpdated,
    });
  } catch (error) {}
};

export const getAllMovies = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 15;

  const startIndex = (page - 1) * pageSize;

  const totalRecord = await MovieLatest.countDocuments();

  MovieLatest.find({})
    .skip(startIndex)
    .limit(pageSize)
    .then((movies) => {
      res.json({
        page,
        totalRecord,
        movies: movies,
      });
    })
    .catch((err) => {
      res.status(500).json({ error: "Error fetching movies", details: err });
    });
};

//get TV shows Data
export const getTvShows = async (req, res) => {
  try {
    const showsList = await TVShow.find({})
      .sort({ firstAirDate: -1 })
      .limit(24);

    if (showsList) {
      return res.status(200).json({
        success: true,
        shows: showsList,
      });
    }
    return res.status(401).json({
      succes: false,
      shows: "failed to find shows",
    });
  } catch (error) {}
};

//get All Shows
export const getAllShows = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 15;

  const startIndex = (page - 1) * pageSize;

  const totalRecord = await TVShow.countDocuments();

  TVShow.find({})
    .skip(startIndex)
    .limit(pageSize)
    .sort({ firstAirDate: -1 })
    .then((movies) => {
      res.json({
        page,
        totalRecord,
        movies: movies,
      });
    })
    .catch((err) => {
      res.status(500).json({ error: "Error fetching movies", details: err });
    });
};

export const addMyList = async (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res
      .status(400)
      .json({ message: "No token provided", success: false });
  }

  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  const user = await User.findById(decoded.userId);

  if (!user) {
    return res.status(404).json({ message: "User not found", success: false });
  }

  const movieExists = await Mylist.findOne({
    movieId: req.body.movieId,
    userId: user._id,
  });

  if (movieExists) {
    return res
      .status(400)
      .json({
        success: false,
        message: "Movie already exists in the database",
      });
  }

  const newMovie = await Mylist.create({
    movieId: req.body.movieId,
    userId: user._id,
    type: 1,
  });

  if (newMovie) {
    return res.status(201).json({
      success: true,
      message: "Movie added successfully",
    });
  }
};

//view my list movies
export const viewMyList = async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No token provided",
      });
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decoded.userId);

    if (user) {
      const mylistEntries = await Mylist.find({ userId: user._id }).select(
        "movieId"
      );

      if (mylistEntries.length === 0) {
        return res.status(200).json({
          success: true,
          moviesList: [],
          message: "No movies in your list",
        });
      }

      const movieIds = mylistEntries.map((entry) => entry.movieId);
      const myListMovies = await MovieLatest.find({ _id: { $in: movieIds } });

      const myListMoviesUpdated = myListMovies.map((movie) => ({
        ...movie.toObject(),
        mylist:true,
      }));

      return res.status(200).json({
        success: true,
        moviesList: myListMoviesUpdated,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

//remove movies from my list
export const removeMylist = async (req, res) => {
  // try {
    const { movieId } = req.body;
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unathorized",
      });
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decoded.userId);

    if (user) {
      const result = await Mylist.deleteOne({
        userId: user._id,
        movieId: movieId,
      });
      if (result.deletedCount > 0) {
        return res.status(200).json({
          success: true,
          message: "removed from my list",
        });
      } else {
        console.log("no record found to delete ");
        return res.status(200).json({
          success: false,
          message: "No record found to delete",
        });
      }
    }
  // } catch {}
};
