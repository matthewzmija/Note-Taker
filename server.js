// Importing Express framework, path module, and API router
const express = require("express");
const path = require("path");
const api = require("./routes/index");

// Indicating the port number
const PORT = 3001;

// Creating an instance of the Express application
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/api", api);

// GET request from root path
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);

// GET request from the "/notes" path
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/notes.html"))
);

// Start server and logging successful startup message
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
