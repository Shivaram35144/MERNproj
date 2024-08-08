// const mongoose = require('mongoose');
import mongoose from 'mongoose';

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

connection();