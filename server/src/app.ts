import express from "express";
import dotenv from "dotenv";
import mrogan from "morgan";
import appRouter from "./routes/index.js";
dotenv.config();

const app = express();

//ROUTES

app.use(express.json()); //middleware to parse json data

//REMOVE morgan in production
app.use(mrogan("dev")); //middleware to log requests - whenever u make API calls we get a log of the request in the console

app.use("/api/v1", appRouter);

export default app;