// this is just to check if db is connecting. 
import mongoose from 'mongoose';
import dotenv from 'dotenv';

const MONGODB_URL = "mongodb+srv://ssss35144:7n626iMlqe5RxvkJ@cluster0.so9d2al.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const connection = async(req,res)=>{
    try{
        await mongoose.connect(MONGODB_URL).then(()=>{
            console.log("DB Connected")
    });
    }
    catch(err){
        console.log("DB Connection Failed");
        console.log(err);
    }
}

async function dropDatabase() {
    try {
        await mongoose.connect(MONGODB_URL).then(()=>{
            console.log("DB Connected")
            const db = mongoose.connection.db;

        
            
        });
        await db.dropDatabase();
        console.log('Database dropped');

        
        

        
    } catch (error) {
        console.error('Error dropping the database:', error);
    }
}
