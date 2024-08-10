import { Request, Response, NextFunction } from 'express';
import User  from '../models/user.js';
import { GoogleGenerativeAI } from '@google/generative-ai';

export const generateChatCompletion = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const {message} = req.body;
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).json({ message: "User not registered OR Token malfunctioned" });
        }

        //grab chats of the user
        const chats = user.chats.map(({role,content})=>({role,content}));
        chats.push({role: "user", content: message});
        user.chats.push({role: "user", content: message});


        //send chats with new one to the AI model
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
        const prompt = chats.map(({role,content})=>`${role}: ${content}`).join("\n");
        
        //get the response from the AI model
        const result = await model.generateContent(prompt);
        const response = await result.response;

        user.chats.push({role: "bot", content: response.text()});
        await user.save();
        return res.status(200).json({ message: "SUCCESS", chats: user.chats });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "ERROR", cause: error.message });
    }
}

export const sendChatsToUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      //user token check
      const user = await User.findById(res.locals.jwtData.id);
      if (!user) {
        return res.status(401).send("User not registered OR Token malfunctioned");
      }
      if (user._id.toString() !== res.locals.jwtData.id) {
        return res.status(401).send("Permissions didn't match");
      }
      return res.status(200).json({ message: "OK", chats: user.chats });
    } catch (error) {
      console.log(error);
      return res.status(200).json({ message: "ERROR", cause: error.message });
    }
  };
  
  export const deleteChats = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      //user token check
      const user = await User.findById(res.locals.jwtData.id);
      if (!user) {
        return res.status(401).send("User not registered OR Token malfunctioned");
      }
      if (user._id.toString() !== res.locals.jwtData.id) {
        return res.status(401).send("Permissions didn't match");
      }
      //@ts-ignore
      user.chats = [];
      await user.save();
      return res.status(200).json({ message: "OK" });
    } catch (error) {
      console.log(error);
      return res.status(200).json({ message: "ERROR", cause: error.message });
    }
  };
  


// const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);
// const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
// async function run() {
//     const prompt = "Write a short story about an AI and magic"
//     const result = await model.generateContent(prompt);
//     const response = await result.response;
//     const text = response.text();
//     console.log(text);
//     return text;
// }