require('dotenv').config({ silent: true }) // load environmental variables from a hidden file named .env
const express = require("express") // import and instantiate express
const morgan = require("morgan") // middleware for nice logging of incoming HTTP requests
const multer = require("multer") // middleware to handle HTTP POST requests with file uploads
const mongoose = require("mongoose") // library for MongoDB
const cors = require("cors") // middleware for enabling CORS (Cross-Origin Resource Sharing) requests
const fs = require("fs") // module to handle readfile or writefile
const bcrypt = require("bcrypt") // module to hash incoming plain text password
const jwt = require("jsonwebtoken") // module for jwt authentication
const passport = require("passport") // middleware for handling authentication requests
const passportJWT = require("passport-jwt") // module to authenticate endpoints using a jwt
const ExtractJwt = passportJWT.ExtractJwt
const JwtStrategy = passportJWT.Strategy
const app = express() // instantiate an Express object

app.use(passport.initialize()) // tell express to use passport middleware
app.use(cors())
app.use(morgan("dev", { skip: (req, res) => process.env.NODE_ENV === "test" })) // use the morgan middleware to log all incoming http requests
app.use(express.json()) // decode JSON-formatted incoming POST data
app.use(express.urlencoded({ extended: true })) // decode url-encoded incoming POST data
app.use("/static", express.static("public")) // make 'public' directory publicly readable with static content

// connect to database
mongoose
    .connect(`${process.env.DB_CONNECTION_STRING}`)
    .then(data => console.log(`Connected to MongoDB`))
    .catch(err => console.error(`Failed to connect to MongoDB: ${err}`))

// grab db models
const { User } = require('./models/User')

// set up some jwt authentication options
let jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt") // look for the Authorization request header
jwtOptions.secretOrKey = process.env.JWT_SECRET // an arbitrary string used during encryption

// a middleware code for using JWT that will be passed to passport
const jwtStrategy = new JwtStrategy(jwtOptions, (payload, done) => {
    // find matching user in DB using the unique user ID stored in jwt's payload section
    const user = User.findById(payload.sub, (err, user) => {
        // error while fetching data from DB
        if(err){
            done(null, false)
        }
        // user not found
        else if(!user){
            done(null, false)
        }
        // user found
        else{
            done(null, user)
        }
    })
})
passport.use(jwtStrategy)

// GET route to check if a user is logged in or not
// if yes, return the user object to the front-end
// if not, passport will throw error so the front-end can catch it
app.get("/isLoggedIn", passport.authenticate("jwt", { session: false }), (req, res) => {
    return res.json({
        success: true,
        user: req.user
    })
})

app.get("/posts",  (req, res) => {
  try {
    fs.readFile('./post.json', (err, data) => {
        if (err) {
            throw err
        }
        var home_posts = []
        // parse JSON object
        const postJSON = JSON.parse(data)
        postJSON.map((item) => (home_posts = home_posts.concat(item.posts)))
        res.json({
            home_posts: home_posts,
            status: "all good",
          })
    })
  } catch (err) {
    console.error(err)
    res.status(400).json({
      error: err,
      status: "failed to retrieve posts from the database",
    })
  }
})

app.get("/megathread/:gameId/posts",  (req, res) => {
  try {
    fs.readFile('./post.json', (err, data) => {
        if (err) {
            throw err
        }
        // parse JSON object
        const postJSON = JSON.parse(data)
        const game_posts = postJSON.find(
            (element) => element.megathreadId == req.params.gameId
          ).posts
          res.json({
            game_posts: game_posts,
            status: "all good",
          })
    })
  } catch (err) {
    console.error(err)
    res.status(400).json({
      error: err,
      status: "failed to retrieve posts from the database",
    })
  }
})

app.get("/megathread/:gameId/subthread/:postId/post",  (req, res) => {
  try {
    fs.readFile('./post.json', (err, data) => {
        if (err) {
            throw err
        }
        var sub_post = []
        // parse JSON object
        const postJSON = JSON.parse(data)
        sub_post = postJSON.find((element) => 
            element.megathreadId == req.params.gameId).posts.find((element) => element.post_id == req.params.postId)
        res.json({
            sub_post: sub_post,
            status: "all good",
          })
    })
  } catch (err) {
    console.error(err)
    res.status(400).json({
      error: err,
      status: "failed to retrieve post from the database",
    })
  }
})

app.get("/megathread/:gameId/subthread/:postId/comments",  (req, res) => {
  try {
    fs.readFile('./comment.json', (err, data) => {
        if (err) {
            throw err
        }
        var comments = []
        // parse JSON object
        const commentJSON = JSON.parse(data)
        comments = commentJSON.find((element) => (element.game_id == req.params.gameId && element.post_id == req.params.postId)).comments

        res.json({
            comments: comments,
            status: "all good",
        })
    })
  } catch (err) {
    console.error(err)
    res.status(400).json({
      error: err,
      status: "failed to retrieve post comments from the database",
    })
  }
})

const getNextID = e =>{
    var level = e.split("_")
    level.splice(-1,1,parseInt(level.at(-1))+1)
    level = level.join("_")
    return level
}

const getLevelIDs = e =>{
    var level = e.split("_")
    var levelID = level[0]
    level.shift()
    for(x in level){
      levelID = `${levelID}_${level[x]}`
        level[x] = levelID
    }
    return level
}

const addComment = e =>{
    for( i of e.arr ){
        if(i.comment_id==e.levels[e.i_levels]) {
            // if last iteration
            if(e.levels.slice(-1)==e.levels[e.i_levels]){
                // if replies isn't empty
                if(i.replies.length > 0){
                    // set the id for the new comment
                    e.newComment.comment_id = getNextID(i.replies.at(-1).comment_id)
                }
                else{
                    // comment id for new reply to a comment
                    e.newComment.comment_id = `${e.levels.slice(-1)}_1`
                }
                // append the new comment to the end
                i.replies.push(e.newComment)
                break
            }
            e.i_levels++
            addComment({arr: i.replies, i_levels: e.i_levels, levels: e.levels, newComment: e.newComment})
        }
    }
}

const addCommentRoot = e =>{
    if(e.arr.length > 0){
        // set the id for the new comment
        e.newComment.comment_id = getNextID(e.arr.at(-1).comment_id)
    }
    else{
        // comment id for new reply to a comment
        e.newComment.comment_id = `${e.root}_1`
    }
    e.arr.push(e.newComment)
}

app.post("/megathread/:gameId/subthread/:postId/comments/save",  (req, res) => {
    // try to save the comment to the database
    try {
        fs.readFile('./comment.json', (err, data) => {
            if (err) {
                console.log(`an error occured while trying to read comment.json`)
            }
            var newComment = {
                comment_id: "",
                user_id: "user",
                text: req.body.comment,
                time: "2048",
                likes: 0,
                replies: []
            }
            // parse JSON object
            const commentJSON = JSON.parse(data)
            // if this is a reply to the post itself
            if(req.body.replyTo == "root"){
                addCommentRoot({arr: commentJSON.find((element) => (element.game_id == req.params.gameId && element.post_id == req.params.postId)).comments,
                    root: `${req.params.gameId}:${req.params.postId}`, newComment: newComment})
            }
            // if it is a reply to a comment
            else{
                var i_levels = 0
                const levels = getLevelIDs(req.body.replyTo)
                // reccursive function to add nested comment
                addComment({arr: commentJSON.find((element) => (element.game_id == req.params.gameId && element.post_id == req.params.postId)).comments,
                i_levels: i_levels, levels: levels, newComment: newComment})
            }
            fs.writeFile("./comment.json", JSON.stringify(commentJSON, null, 2), (err) => {
                if (err){
                    console.log(`an error occured while trying to write to comment.json`)
                }
                console.log('Data written to file')
            })
            return res.json({
                comment: newComment, // return the message we just saved
                status: 'all good',
            })
        })
    } catch (err) {
      console.error(err)
      return res.status(400).json({
        error: err,
        status: 'failed to save the message to the database',
      })
    }
  })

  //hard coded for now
  //wait for the actual database to work on
  const gameNameToId = e =>{
      if(e == "Valorant"){return 1}
      if(e == "LOL"){return 2}
      if(e == "CSGO"){return 3}
  }

// handle new post submitted by user
app.post("/megathread/new", (req, res) => {
    const gameName = req.body.game_name
    const gameId = gameNameToId(gameName)
    const title = req.body.title
    const content = req.body.body
    const tags = req.body.tags
    const time = req.body.time

    if(!gameName.trim() || !title.trim() || !content.trim() || !tags.trim() || !time.trim()){
        return res.json({
            missing: "Please fill out all parts!"
        })
    }
    else{
        fs.readFile("./post.json", (err, data) => {
            // creat file
            if(err){
                const postArray = []
                const newPost = {
                    "game_id": gameId,
                    "post_id": 1,
                    //hard coded wait for later update
                    "user_id": "user",
                    "title": title,
                    "body": content,
                    "tags": [tags],
                    "time": time,
                    "likes": 0,
                    //image upload not implemented
                    "image": "https://picsum.photos/200?random=1",
                    "comments": []
                }
                postArray.push(newPost)

                fs.writeFile("./post.json", JSON.stringify(postArray), err => {
                    if(err){
                        console.log("An error occured while writing to the file!")
                    }
                    else{
                        return res.json({
                            success: "New post created!"
                        })
                    }
                })
            }

            //write to file if the file exists
            else{
                const postArray = JSON.parse(data)
                const newPost = {
                    "game_id": gameId,
                    "post_id": 1,
                    //hard coded wait for later update
                    "user_id": "user",
                    "title": title,
                    "body": content,
                    "tags": [tags],
                    "time": time,
                    "likes": 0,
                    //image upload not implemented
                    "image": "https://picsum.photos/200?random=1",
                    "comments": []
                }
                postArray.push(newPost) 
                fs.writeFile("./post.json", JSON.stringify(postArray), err => {
                    if(err){
                        console.log("An error occured while writing to the file!")
                    }
                    else{
                        return res.json({
                            success: "Request submitted! We will get back to you ASAP!"
                        })
                    }
                })
            }
        })
    }
})

// handle thread request submitted by user
app.post("/threadrequest", (req, res) => {
    const gameName = req.body.gameName
    const willModerate = req.body.willModerate
    const friendsWillModerate = req.body.friendsWillModerate
    const reason = req.body.reason

    if(!gameName.trim() || (willModerate !== 1 && willModerate !== 0) || 
    (friendsWillModerate !== 1 && friendsWillModerate !== 0) || !reason.trim()){
        return res.json({
            missing: "Please fill out all parts!"
        })
    }
    else{
        fs.readFile("./threadRequestList.json", (err, data) => {
            // if there is no thread request list currently, create one
            if(err){
                const threadRequestArr = []
                const newRequest = {"gameName": gameName, "willModerate": willModerate, 
                "friendsWillModerate": friendsWillModerate, "reason": reason, "approvalStatus": ""}
                threadRequestArr.push(newRequest)
                // write new request to file (will write to db later), so that
                // admin panel can grab data
                fs.writeFile("./threadRequestList.json", JSON.stringify(threadRequestArr), err => {
                    if(err){
                        console.log("An error occured while writing to the file!")
                    }
                    else{
                        return res.json({
                            success: "Request submitted! We will get back to you ASAP!"
                        })
                    }
                })
            }
            // if there already exists a list for the thread request, then
            // simple append the new request to the exisiting list, and write to file (later db)
            else{
                const threadRequestArr = JSON.parse(data)
                const newRequest = {"gameName": gameName, "willModerate": willModerate, 
                "friendsWillModerate": friendsWillModerate, "reason": reason, "approvalStatus": ""}
                threadRequestArr.push(newRequest) 
                fs.writeFile("./threadRequestList.json", JSON.stringify(threadRequestArr), err => {
                    if(err){
                        console.log("An error occured while writing to the file!")
                    }
                    else{
                        return res.json({
                            success: "Request submitted! We will get back to you ASAP!"
                        })
                    }
                })
            }
        })
    }
})

// helper function to generate a jwt
// payload (sub) section contains the id of that user
const signToken = user => {
    return jwt.sign({
        sub: user.id
    }, jwtOptions.secretOrKey)
}

// handle user registration, using JWT authentication
app.post("/register", (req, res) => {
    const dateObj = new Date()
    const year = dateObj.getFullYear()
    const month = ("0" + (dateObj.getMonth() + 1)).slice(-2)
    const date = ("0" + dateObj.getDate()).slice(-2)
    const username = req.body.username.toLowerCase()
    const password = req.body.password
    const email = req.body.email.toLowerCase()

    // missing essential info from the register form
    if(!username.trim() || !email.trim() || !password){
        return res.json({
            missing: "Please fill out all parts!"
        })  
    }
    else if(!/^[A-Za-z0-9]+$/.test(username)){
        return res.json({
            invalidNameFormat: "Only alphanumeric characters are allowed in username!"
        })
    }
    else{
        User.findOne({username}, (err, result) => {
            // error retrieving data from the DB
            if(err){
                console.log(err)
            }
            // prevent two users having the same username
            else if(result != null){
                return res.json({
                    duplicated: "User already exists!"
                }) 
            }
            // begin the registration and authentication process
            else{
                // hash the incoming plain text password and store it in DB
                bcrypt.hash(password, 10, (err, hashedPassword) => {
                    // something wrong while hashing the plain text password
                    if(err){
                        console.log(err)
                    }
                    else{
                        // create a new user object using the User schema
                        // that we've defined in models/User.js
                        const newUser = new User({
                            username: username,
                            password: hashedPassword,
                            email: email,
                            joinDate: year + "-" + month + "-" + date
                        })

                        // try to save this new user object into DB
                        newUser.save((err, user) => {
                            if(err){
                                console.log(err)
                            }
                            // user successfully saved to db
                            else{
                                // generate the jwt using our signToken helper function
                                const token = signToken(user)
                                return res.json({
                                    success: `Welcome to Ranked, ${user.username}!`,
                                    token: token
                                }) 
                            }
                        })
                    }
                })
            }
        })
    }
})

// POST route to handle user login authentication
app.post("/login", (req, res) => {
    const username = req.body.username.toLowerCase()
    const password = req.body.password

    if(!username.trim() || !password){
        return res.json({
            missing: "Username or password missing!"
        })   
    }
    else{
        User.findOne({username: username}, (err, user) => {
            // error while retrieving data from the DB
            if(err){
                console.log(err)
            }
            // user not found
            else if(!user){
                return res.json({
                    notFound: "User not found!"
                }) 
            }
            // user found, check for password match
            else{
                bcrypt.compare(password, user.password, (err, result) => {
                    // something wrong while using the bcrypt module
                    if(err){
                        console.log(err)
                    }
                    // input password does not match with what we have on file
                    else if(result == false){
                        return res.json({
                            incorrect: "Password incorrect!"
                        }) 
                    }
                    // sign-in successful
                    else{
                        const token = signToken(user)
                        return res.json({
                            success: `Welcome back, ${user.username}!`,
                            token: token
                        }) 
                    }
                })
            }
        })
    }
})

app.get("/admin", (req, res) => {
    fs.readFile("./threadRequestList.json", (err, data) => {
        if(err){
            console.log(err)
        }
        else{
            const threadRequestList = JSON.parse(data)
            return res.json({
                threadRequestList: threadRequestList
            })
        }
    })
})

// approve or reject a user submitted thread request
app.post("/admin", (req, res) => {
    const adminDecision = req.body.approvalStatus
    const inputGameName = req.body.gameName

    // process request form cannot be empty
    if(adminDecision !== 1 && adminDecision !== 0){
        return res.json({
            missing: "Please select approve or reject first!"
        })
    }
    else{
        fs.readFile("./threadRequestList.json", (err, data) => {
            if(err){
                console.log(err)
            }
            else{
                const requestList = JSON.parse(data)
                requestList.forEach(eachRequest => {
                    // find the matching request first, and if its approval status has not been
                    // handled yet, update it based on admin's decision
                    if(inputGameName == eachRequest.gameName){
                        if(!eachRequest.approvalStatus.trim()){
                            eachRequest.approvalStatus = adminDecision ? "Approved" : "Rejected"
                            // update the .json file that stores the thread request list
                            fs.writeFile("./threadRequestList.json", JSON.stringify(requestList), err => {
                                if(err){
                                    console.log("An error occured while writing to the file!")
                                }
                                else{
                                    return res.json({
                                        success: "Approval status updated!"
                                    })
                                }
                            })
                        }
                        // if this request has already been processed, send a message
                        // back to the admin to remind them
                        else{
                            return res.json({
                                alreadyProcessed: "This request has already been processed!"
                            })
                        }
                    }
                })
            }
        })
    }
})

// export the express app created to make it available to other modules
module.exports = app