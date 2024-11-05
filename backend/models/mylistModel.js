import mongoose from "mongoose";

const mylistSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
    },
    movieId: {
        type: mongoose.Schema.Types.ObjectId, 
        required: true,
    },
    type:{
      type:Number,
      required:true,
    }
   
}, {timestamps:true});

export const Mylist=mongoose.model("Mylist",mylistSchema);