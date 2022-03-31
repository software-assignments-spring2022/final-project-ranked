const express = require("express") // import and instantiate express
const path = require("path") 
const morgan = require("morgan") // middleware for nice logging of incoming HTTP requests
const multer = require("multer") // middleware to handle HTTP POST requests with file uploads
const mongoose = require("mongoose") // library for MongoDB
const fs = require("fs") // module to handle readfile or writefile
const cors = require("cors") // middleware for enabling CORS (Cross-Origin Resource Sharing) requests.
const app = express() // instantiate an Express object

app.use(express.json()) // decode JSON-formatted incoming POST data
app.use(express.urlencoded({ extended: true })) // decode url-encoded incoming POST data
app.use("/static", express.static("public")) // make 'public' directory publicly readable with static content
app.use(cors()) // allow cross-origin resource sharing
app.use(morgan("dev")) // use the morgan middleware to log all incoming http requests

// demo: route for HTTP GET requests to the root document
app.get("/", (req, res) => {
    res.send("Welcome to Ranked!")
})

app.post("/login", (req, res) => {
    const username = req.body.username.toLowerCase()
    const password = req.body.password
    
    if(!username.trim() || !password){
        return res.json({
            missing: "Username or password missing!"
        })   
    }
    else{
        fs.readFile("./user.json", (err, data) => {
            if(err){
                console.log(err)
            }
            else{
                const user = JSON.parse(data)
                if(user.username != username){
                    return res.json({
                        notFound: "User not found!"
                    }) 
                }
                else{
                    return res.json({
                        success: "Login success!",
                        user: user
                    }) 
                }
            }
        })
    }
})

// export the express app created to make it available to other modules
module.exports = app