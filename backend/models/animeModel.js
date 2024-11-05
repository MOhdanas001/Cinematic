import mongoose from "mongoose";

// Define the schema for your anime data
const animeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  genres: { type: [String], required: true },
  image: { type: String, required: true },
  myanimelist_url: { type: String, required: true },
  myanimelist_id: { type: Number, required: true },
  rank: { type: Number, required: true },
  score: { type: Number, required: true },
  type: { type: String, required: true },
  aired_on: { type: String, required: true },
  members: { type: Number, required: true },
}, { collection: 'anime_data' }); 

// Export the AnimeData model
const AnimeData = mongoose.model("AnimeData", animeSchema);
export default AnimeData;
