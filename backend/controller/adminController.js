import { response } from "express";
import { User } from "../models/userModel.js";

export const getUserData = async(req,res)=>{

    try {
       
    const users=  await User.find();
     if(users){
        return res.status(200).json({
            success:true,
            users:users

        })
     }   
     else{
        return res.status(200).json({
            success:false,
            message:"failed to find user Data"
        })
     } 

    } catch (error) {
        
    }
}
 
export const getAdminShows = async(res,req)=>{


}