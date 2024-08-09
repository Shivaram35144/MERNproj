
import { Request, Response, NextFunction } from "express";
import User from "../models/user.js";
import bcrypt from "bcrypt";

export const getAllUsers = async (req: Request, res:Response, next:NextFunction) => {
    //get all users from the db
    try{
        const users = await User.find();
        return res.status(200).json({message:"OK", users});
    }catch(err){
        console.log(err);
        return res.status(200).json({message:"OK", error: err});
    }
}



export const deleteUser = async (req: Request, res:Response, next:NextFunction) => {    
    try{
        const email = req.body.email;
        const user = await User.findOneAndDelete({email});
        if(user){
            return res.status(200).json({message:"User deleted successfully"});
        }
        return res.status(404).json({message:"User not found"});
    }catch(err){
        console.log(err);
        return res.status(200).json({message:"OK", error: err});
    }
}


export const userSignup = async (req: Request, res:Response, next:NextFunction) => {

    try{
        const {name, email, password} = req.body;

        //check if already exist 
        const userExist = await User.findOne({email});
        if(userExist){
            return res.status(401).json({message:"User already exists"}); //401 is for unauthorized
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({name, email, password: hashedPassword});
        await user.save();
        return res.status(201).json({message:"User created successfully", id: user._id.toString()});
    }catch(err){
        console.log(err);
        return res.status(200).json({message:"error", error: err});
    }
}

export const userLogin = async (req: Request, res:Response, next:NextFunction) => {
    try{
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(401).send("User not found"); //401 is for unauthorized
        }
        const isValid = await bcrypt.compare(password, user.password);
        if(!isValid){
            return res.status(403).send("Invalid password"); //403 is for forbidden
        }
        return res.status(200).json({message:"Login successful", id: user._id.toString()});
    }catch(err){
        console.log(err);
        return res.status(200).json({message:"ERROR", error: err});
    }
}   