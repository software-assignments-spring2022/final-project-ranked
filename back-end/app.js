const express = require("express") // import and instantiate express
const path = require("path") 
const morgan = require("morgan") // middleware for nice logging of incoming HTTP requests
const multer = require("multer") // middleware to handle HTTP POST requests with file uploads
const mongoose = require("mongoose") // library for MongoDB
const app = express() // instantiate an Express object

app.use(morgan("dev")) // use the morgan middleware to log all incoming http requests
app.use(express.json()) // decode JSON-formatted incoming POST data
app.use(express.urlencoded({ extended: true })) // decode url-encoded incoming POST data
app.use("/static", express.static("public")) // make 'public' directory publicly readable with static content

// demo: route for HTTP GET requests to the root document
app.get("/", (req, res) => {
    res.send("Welcome to Ranked!")
})

// export the express app created to make it available to other modules
module.exports = app