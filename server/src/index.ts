import app from "./app.js";

import {connectDb, disconnectDb} from "./db/connection.js";

// import run from "./models/geminiTest.js";

//connections and listeners



connectDb().then(()=>
    app.listen(process.env.PORT, () => {
        console.log("Server is running on http://localhost:3000");
    })
)

//display in the webpage using a get request

// app.get("/", (req, res) => {
//     res.send(run());
// });

