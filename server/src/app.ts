import express from "express";
import dotenv from "dotenv";
dotenv.config();

const app = express();

//ROUTES

app.use(express.json()); //middleware to parse json data


export default app;