// Importing the Express framework and custom router module
const express = require("express");
const router = require("./notes");

// Creating an instance of the Express application
const app = express();

//Middleware
app.use("/notes", router);

//Exporting the Express application to make it accessible to other modules
module.exports = app;
