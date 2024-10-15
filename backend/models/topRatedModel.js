import mongoose from "mongoose";
// import { topRatedMovies } from "../controller/browseController";

const topRateMoviesSchema=new mongoose.Schema({
    
    id: {
        type: Number,
        required: true,
        unique: true,
      },
      adult: {
        type: Boolean,
        default: false,
      },
      genres: {
        type: [String],
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      originalTitle: {
        type: String,
        required: true,
      },
      releaseDate: {
        type: Date,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
      overview: {
        type: String,
        required: true,
      },
      voteAverage: {
        type: Number,
        required: true,
      },
      voteCount: {
        type: Number,
        required: true,
      },
      popularity: {
        type: Number,
        required: true,
      },
      originalLanguage: {
        type: String,
        required: true,
      }
    },
    { collection: 'top_rated_movies' }
);
    
    // Create the Movie model
    const topRatedMovie = mongoose.model('Movie', topRateMoviesSchema);
    
    export default topRatedMovie;