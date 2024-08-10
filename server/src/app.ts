import express from "express";
import dotenv from "dotenv";
import mrogan from "morgan";
import appRouter from "./routes/index.js";
import cookieParser from "cookie-parser";
import cors from "cors";
dotenv.config();

const app = express();

//ROUTES
app.use(cors({ origin: "http://localhost:5173", credentials: true })); //middleware to allow cross origin requests
app.use(express.json()); //middleware to parse json data
app.use(cookieParser(process.env.COOKIE_SECRET)); //middleware to parse cookies

//REMOVE morgan in production
app.use(mrogan("dev")); //middleware to log requests - whenever u make API calls we get a log of the request in the console

app.use("/api/v1", appRouter);

export default app;