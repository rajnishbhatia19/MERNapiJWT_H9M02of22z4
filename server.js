// https://www.youtube.com/watch?v=H9M02of22z4

//console.log("I am in express project");

const express = require("express");
const errorHandler = require("./middleware/errorhandler");
const connectDb = require("./config/dbConnection");
const dotenv = require("dotenv").config();

connectDb();
const app = express();

const port = process.env.PORT || 5000;

//Provide a route so thunder client sees a route rather than Status: 404 Not Found

app.get('/api/oldcontacts', (req,res)=>{
    res.send("Get all contacts");
})

app.get('/api/oldcontactsjson', (req,res)=>{
    res.json({message: "Get all contacts"});
})

app.get('/api/oldcontactsjsonwithstatus', (req,res)=>{
    res.status(200).json({message: "Get all contacts"});
})

// Parsing the stream of data as json, express provides a parser middleware
app.use(express.json());

//To add middleware logic and routes, we need to do app.use
app.use("/api/contacts", require("./routes/contactRoutes"));

//To add User Authentication route
app.use("/api/users", require("./routes/userRoutes"));

// To print the error responses in JSON format, created middleware errorHandler.js
app.use(errorHandler);

//To manage all routes neatly, we'll create a routes folder

app.listen(port, ()=>{
    console.log(`Server running on port ${port}`)
})