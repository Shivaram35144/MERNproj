import Router from "express";
import { verifyToken } from "../utils/token-manager.js";
import { chatValidator, validate } from "../utils/validators.js";
import { generateChatCompletion, sendChatsToUser, deleteChats } from "../controllers/chat-controllers.js";


const chatRoutes = Router();

//PROTECTED APIS
chatRoutes.post("/new", validate(chatValidator), verifyToken, generateChatCompletion );
chatRoutes.get("/all-chats", verifyToken, sendChatsToUser);
chatRoutes.delete("/delete", verifyToken, deleteChats);


export default chatRoutes;