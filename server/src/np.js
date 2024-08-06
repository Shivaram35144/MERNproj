import mongoose from 'mongoose';
const MONGODB_URL = "mongodb+srv://mernUser:passwd@merncluster0.n0xkmcm.mongodb.net/datamongo?retryWrites=true&w=majority&appName=MernCluster0";


async function checkConnection() {

    

    console.log('MongoDB URL:', MONGODB_URL);

    try {
        console.log('Attempting to connect to the database...');
        await mongoose.connect(MONGODB_URL, {
            serverSelectionTimeoutMS: 5000, // 5 seconds timeout
            socketTimeoutMS: 45000, // 45 seconds socket timeout
        });
        console.log('Connected to the database successfully!');
    } catch (error) {
        console.error('Error connecting to the database:', error.message);
        console.error('Detailed Error Information:', error);
        process.exit(1);
    }
}

checkConnection();
