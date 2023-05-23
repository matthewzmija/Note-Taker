// Import Express framework, file system module, and promisify
const express = require("express");
const fs = require("fs");
const { promisify } = require("util");

// Creating an instance of the Express router, promisifying the 'fs.readFile' and 'fs.writeFile', and The file path of the JSON file used for storing notes
const router = express.Router();
const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);
const dbFilePath = "./db/db.json";

// GET route to fetch notes
router.get("/", (req, res) => {
  readFileAsync(dbFilePath, "utf8")
    .then((data) => {
      const parsedData = JSON.parse(data);
      res.status(200).json(parsedData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Server error" });
    });
});

// POST route to add a new note
router.post("/", (req, res) => {
  readFileAsync(dbFilePath, "utf8")
    .then((data) => {
      let parsedData = JSON.parse(data);
      const id = Date.now().toString();
      req.body.id = id;
      parsedData.push(req.body);
      return writeFileAsync(
        dbFilePath,
        JSON.stringify(parsedData, null, "\t"),
        "utf8"
      );
    })
    .then(() => {
      // After writing the updated data to the file, read it again to include the newly added note
      return readFileAsync(dbFilePath, "utf8");
    })
    .then((data) => {
      const parsedData = JSON.parse(data);
      res.status(201).json({ message: "Task added", data: parsedData });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    });
});
// Exporting the router to make it accessible to other modules
module.exports = router;
