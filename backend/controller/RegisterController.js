import { response } from "express";
import { User } from "../models/userModel.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";


export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(401).json({
        message: "Please fill all the feilds",
        success: false,
      });
    }

    const user = await User.findOne({ email });

    if (user) {
      return res.status(401).json({
        message: "Account already exist",
        success: false,
      });
    }

    const hashpassword = await bcryptjs.hash(password, 10);
    const create = await User.create({
      name,
      email,
      password: hashpassword,
    });
    if (create) {
      return res.status(200).json({
        message: "Account created successfully",
        success: true,
      });
    }
  } catch (error) {
    console.log(`failed to create user: ${error}`);
  }
};

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(401).json({
        message: "Email and password are required",
        success: false,
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
        success: false,
      });
    }

    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
        success: false,
      });
    }

    const token = jwt.sign({ userId: user._id }, "kdhbskryedvgdssdcds", {
      expiresIn: "1d",
    });
    res.cookie('token',token);
    return res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        secure: false, 
        sameSite: "Strict",
      })
      .json({
        token,
        user: user,
        message: "Login Successful",
        success: true,
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const logout = async (req, res) => {
  try {
    // Clear the cookie by setting it with an expired date
    res.cookie('token', '', { 
      httpOnly: true, 
      expires: new Date(0)  // Set expiration to a past date
    });
    
    return res.status(200).json({ 
      success: true, 
      message: 'Logout successful' 
    });
  } catch (error) {
    return res.status(500).json({ 
      success: false, 
      message: 'Error logging out' 
    });
  }
};


export const checkauth = async (req,res)=>{


  const token=req.cookies.token;

 
  if(!token){
    return res.status(200).json({ message: 'No token provided', success: false });
  }

  try{
    const decoded= jwt.verify(token,"kdhbskryedvgdssdcds");


    const user=await User.findById(decoded.userId);
    console.log(decoded.userId);

    if(!user){
      return res.status(200).json({ message: 'Invalid token', success: false });
    }
    
    return res.status(200).json({ message: 'Token valid', success: true, user });
  }
  catch(error){
    return res.status(401).json({ message: 'Token expired or invalid', success: false });
  }

}