import mongoose from "mongoose";

const tvShowSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  adult: {
    type: Boolean,
    default: false
  },
  genres: {
    type: [String], // An array of strings for genres
    required: true
  },
  title: {
    type: String,
    required: true
  },
  originalName: {
    type: String
  },
  firstAirDate: {
    type: Date,
    required: true
  },
  image: {
    type: String
  },
  overview: {
    type: String
  },
  voteAverage: {
    type: Number,
    required: true
  },
  voteCount: {
    type: Number,
    required: true
  },
  popularity: {
    type: Number,
    required: true
  },
  originalLanguage: {
    type: String,
    required: true
  },
}, 
  { collection: "tv_shows"}
);

// Export the model
const TVShow = mongoose.model('TVShow', tvShowSchema);

export default TVShow;
