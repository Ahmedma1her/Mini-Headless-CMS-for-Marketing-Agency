const express = require("express");
const dotenv = require ("dotenv");
dotenv.config();
const app= express();
app.use(express.json());
const mongoose= require("mongoose");

async function connectDB () {
    try{
await mongoose.connect ("mongodb://localhost:27017/minicmsproject");
    console.log("MongoDB Connected");

    } catch (error) {
        console.log(error);
    }
}

connectDB();
const port = process.env.PORT || 5000;
app .listen (port, () => {
    console.log ("server running");
});
