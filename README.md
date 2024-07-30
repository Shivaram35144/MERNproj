# MERN proj

This is going to be a social media page with auth and jwt.
MONGO: user - passwd123 - ip: 27.5.126.197/32 - mongodb+srv://user:passwd123@merncluster0.mzrtz7j.mongodb.net/?retryWrites=true&w=majority&appName=mernCluster0

# BACKEND

1. Open the server dir and do npm i -g nodemon // so that we can run the server live
2. npm i express body-parser (to process req body)
                 bcrypt (passwd encryption)
                 cors (cross origin requests)
                 dotenv (for env variables)
                 gridfs-stream (file upload)
                 multer 
                 multer-gridfs-storage (file upload local)
                 helmet (request safety)
                 morgan (login)
                 jsonwebtoken 
                 mongoose
3. npm init -y (set up package.json)



# STARTING SERVER
1. nodemon server.js // nodemon is for dev restart server if any change is found.
