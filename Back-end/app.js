const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

const app = express();

app.use(express.json());

app.use("/uploads", express.static("uploads"));

const userRoutes = require("./routes/authRoute");
const postRoutes = require("./routes/postRoute");
<<<<<<< HEAD
async function connectDB () {

 try{
await mongoose.connect (process.env.DB_URL);
 console.log("MongoDB Connected");

 } catch (error) {
 console.log(error);
 }}
=======
>>>>>>> 2b7b510 (feat: integrate multer middleware for file uploads)

async function connectDB() {
  try {
    await mongoose.connect("mongodb://localhost:27017/minicmsproject");
    console.log("MongoDB Connected");
  } catch (error) {
    console.log(error);
  }
}

connectDB();

app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("server running");
});