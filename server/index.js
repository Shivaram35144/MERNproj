import express from "express"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import multer from "multer"
import helmet from "helmet"
import morgan from "morgan"
import path from "path"
import { fileURLToPath } from "url"


/* CONFIGURATIONS */
const __filename = fileURLToPath(import.meta.url); // get the current file path

const __dirname = path.dirname(__filename); // get the directory name of the current file

dotenv.config(); // load environment variables from .env file

const app = express(); // create an instance of the Express application

app.use(express.json()); // parse incoming JSON requests and put the parsed data in req.body

app.use(helmet()); // secure the Express app by setting various HTTP headers

app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"})); // set Cross-Origin Resource Policy header to allow cross-origin resource sharing

app.use(morgan("common")); // log HTTP requests in the common format

app.use(bodyParser.json({limit: "30mb", extended: true})); // parse JSON data with a limit of 30MB

app.use(bodyParser.urlencoded({limit: "30mb", extended: true})); // parse URL-encoded data with a limit of 30MB

app.use(cors()); // enable Cross-Origin Resource Sharing for requests from different origins

app.use("/assets", express.static(path.join(__dirname, "public/assets"))); // serve static files from the "public/assets" directory



/* FILE STORAGE */
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/assets");
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name);
    }
});

const upload = multer({storage: storage});

/* MONGODB CONNECTION */

const PORT = process.env.PORT || 6001; // set the port for the server
mongoose.connect(process.env.MONGO_URL).then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((error) => {
    console.log(error.message);
});
