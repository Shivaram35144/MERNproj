import app from "./app.js";

import {connectDb, disconnectDb} from "./db/connection.js";

//connections and listeners

// console.log('MongoDB URL: ', process.env.MONGODB_URL);

connectDb().then(()=>
    app.listen(3000, () => {
        console.log("Server is running on http://localhost:3000");
    })
)




// disconnectDb();

console.log("Hello Worlds");
