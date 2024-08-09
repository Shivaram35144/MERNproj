import {connect, disconnect} from 'mongoose';
import mongoose from 'mongoose';

async function connectDb(){
    try {
        await mongoose.connect(process.env.MONGODB_URL).then(
            
            () =>{
                console.log("Connected to the database");
            }
        )
    } catch (error) {
        console.error('Error connecting to the database: ', error.message);
    }

}

async function disconnectDb(){
    try {
        await disconnect();
        console.log('Disconnected from the database');
    } catch (error) {
        console.error('Error disconnecting from the database: ', error);
        process.exit(1);
    }
}   

export  {connectDb, disconnectDb};