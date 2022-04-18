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
const _ = require('lodash')

app.use(passport.initialize()) // tell express to use passport middleware
app.use(cors())
app.use(morgan("dev", { skip: (req, res) => process.env.NODE_ENV === "test" })) // use the morgan middleware to log all incoming http requests
app.use(express.json({limit: '25mb'})) // decode JSON-formatted incoming POST data
app.use(express.urlencoded({limit: '25mb', extended: true})) // decode url-encoded incoming POST data
app.use("/static", express.static("public")) // make 'public' directory publicly readable with static content

// connect to database
mongoose
    .connect(`${process.env.DB_CONNECTION_STRING}`)
    .then(data => console.log(`Connected to MongoDB`))
    .catch(err => console.error(`Failed to connect to MongoDB: ${err}`))

// grab db models
const { User } = require('./models/User')
const { Comment } = require('./models/Comment')
const { Post } = require('./models/Post')
const { Megathread } = require('./models/Megathread')
const { ThreadRequest } = require('./models/ThreadRequest')

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

app.get("/games", async (req, res) => {
  try{
    const allGames = await Megathread.find({})
    res.json({
      games: allGames,
      status: "all good",
    })
  } catch (err){
    console.error(err)
    res.status(400).json({
      error: err,
      status: "failed to retrieve GAMES from the database",
    })
  }
})

app.get("/posts", async (req, res) => {
  try {
    const allPosts = await Post.find({})
    res.json({
      home_posts: allPosts,
      status: "all good",
    })
  } catch (err) {
    console.error(err)
    res.status(400).json({
      error: err,
      status: "failed to retrieve posts from the database",
    })
  }
})

app.get("/megathread/:gameId/posts", async (req, res) => {
  try {
    const allPosts = await Post.find({toMegathread: req.params.gameId})
    const game = await Megathread.findOne({_id: req.params.gameId})
    res.json({
      game_posts: allPosts,
      gamename: game.gamename,
      status: "all good",
    })
  } catch (err) {
    console.error(err)
    res.status(400).json({
      error: err,
      status: "failed to retrieve posts from the database",
    })
  }
})

app.get("/:postId/post", async (req, res) => {
  try {
    const thisPost = await Post.findOne({_id: req.params.postId})
    res.json({
      sub_post: thisPost,
      status: "all good",
    })
  } catch (err) {
    console.error(err)
    res.status(400).json({
      error: err,
      status: "failed to retrieve post from the database",
    })
  }
})


const populateReplies = async (arr) => {
  try{
    for(i of arr){
        const tempArr = await Comment.find({ replyTo: i._id })
        i.replies.push(...tempArr)
        await populateReplies(i.replies)
    }
  } catch(err) {
    throw err
  }
}

app.get("/:postId/comments", async (req, res) => {
  try {
    let comments = await Comment.find({ postTo: req.params.postId })
    await populateReplies(comments)
    res.json({
      comments: comments,
      status: "all good",
    })
  } catch (err) {
    console.error(err)
    res.status(400).json({
      error: err,
      status: "failed to retrieve comments from the database",
    })
  }
})

app.post( "/:id/comments/save", async (req, res) => {
    try {
      // try to save the comment to the database
      console.assert(!_.isEmpty(req.body.user))
      console.assert(!_.isEmpty(req.body.comment))
      let newComment = new Comment({
        user_id: req.body.user.username,
        text: req.body.comment
      })
      req.body.replyTo == "root"
        ? (newComment.postTo = req.params.id)
        : (newComment.replyTo = req.params.id)
      const saveComment = await newComment.save()
      return res.json({
        success: `You commented!`,
        comment: saveComment,
      })
    } catch (err) {
      console.error(err)
      return res.status(400).json({
        error: err,
        status: "failed to save the message to the database",
      })
    }
  }
)

  //hard coded for now
  //wait for the actual database to work on
  const gameNameToId = e =>{
      if(e == "Valorant"){return 1}
      if(e == "LOL"){return 2}
      if(e == "CSGO"){return 3}
  }

// app.post("/megathread/:gameId/subthread/:postId/comments", (req, res) => {
//     /* 
//     Update indivdual comments in our db (primarily dealing with upvoting/downvoting, but can be altered to help with replies).
//     Request BODY should look like:
//         {
//             'comment_id': int,
//             'likes': int,
//             'likedUsers': User[]
//         }
//     Updating is done by setting the array of comments associated with the Post object (gotten by props.postId) to a new array variable.
//     Then it loops through the comments until a Comment object object has the same comment_id as in the request body.
//     Once a match is found, it changes the data in the individual Comment object.
//     Finally, the endpoint updates the ENTIRE comments array (Post.comments) associated with the Post object with the new comments array variable.
//     Returns successful if response.acknowledged is true and the new comments array, otherwise prints an extremely vague error to console.
//     */
//     const comments = await Post.find({'post_id':props.postId}).comments
//     for (const i in comments) {
//         if (i.comment_id === req.data.comment_id) {
//             i.likes = req.data.likes;
//             i.likedUsers = req.data.likedUsers;
//         }
//     }
//     const response = await Post.updateOne({'comments':comments});
//     if (response.acknowledged) {
//         return res.json({
//             success: 'Comment has been updated.',
//             comments: Post.find({'post_id':props.postId}).comments
//         })
//     } else {
//         console.log('Something went wrong in updating the comment.')
//     }
// })

// app.post("/megathread/:gameId/subthread/:postId/comments/search", (req, res) => {
//     /*
//     Find individual comments
//     Body:
//         {
//             'comment_id': int
//         }
//     */
//     const comments = await Post.find({'post_id':props.postId}).comments;
//     for (const i in comments) {
//         if (i.comment_id === req.data.comment_id) {
//             return res.json({
//                 success: "Comment found and returned successfully",
//                 comment: i
//             })
//         }
//     }
//     console.log("Failed: Could not find comment.")
// })

app.post(`/megathread/:gameId/save`, async (req, res) => {
  try {
    // try to save the comment to the database
    // console.assert(!_.isEmpty(req.body.user))
    // console.assert(!_.isEmpty(req.body.comment))
    let newPost = new Post({
      user_id: req.body.username,
      title: req.body.title,
      body: req.body.body,
      tags: req.body.tags,
      image: req.body.photo,
      toMegathread: req.params.gameId
    })
    const savePost = await newPost.save()
    return res.json({
      success: `You Posted!`,
      post: savePost,
    })
  } catch (err) {
    console.error(err)
    return res.status(400).json({
      error: err,
      status: "failed to save the message to the database",
    })
  }
})

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
    const dateObj = new Date()
    const year = dateObj.getFullYear()
    const month = ("0" + (dateObj.getMonth() + 1)).slice(-2)
    const date = ("0" + dateObj.getDate()).slice(-2)
    const hours = dateObj.getHours()
    const minutes = dateObj.getMinutes()
    const seconds = dateObj.getSeconds()
    const gameName = req.body.gameName
    const willModerate = req.body.willModerate
    const friendsWillModerate = req.body.friendsWillModerate
    const reason = req.body.reason
    const username = req.body.username
    const userID = req.body.userID

    // each field of the form should not be empty or missing
    if(!gameName.trim() || (willModerate !== 1 && willModerate !== 0) || 
    (friendsWillModerate !== 1 && friendsWillModerate !== 0) || !reason.trim()){
        return res.json({
            missing: "Please fill out all parts!"
        })
    }
    else{
        const newThreadRequest = new ThreadRequest({
            gameName: gameName,
            willModerate: willModerate,
            friendsWillModerate: friendsWillModerate,
            reason: reason,
            requestedUsername: username,
            requestedUserId: userID,
            dateRequested: `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`,
            approvalStatus: "pending"
        })

        newThreadRequest.save(err => {
            // something went wrong during the saving
            if(err){
                console.log(err)
            }
            else{
                return res.json({
                    success: "Request submitted! We will get back to you ASAP!"
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
    //default profile photo
    const photo = "123"

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
                            joinDate: year + "-" + month + "-" + date,
                            photo: photo
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
    ThreadRequest.find({}, (err, result) => {
        if(err){
            console.log(err)
        }
        else{
            return res.json({
                threadRequestList: result
            })
        }
    })
})

app.get("/search", async (req, res) => {
    try{
        const postsArray = await Post.find({})
        return res.json({
            postsArray: postsArray,
            success: 'all good'
        })
    } catch(err){
        return res.status(400).json({
            error: err,
            status: "failed to fetch all the posts (SEARCH BAR)"
        })
    }
})

// approve or reject a user submitted thread request
app.post("/admin", async (req, res) => {
    const adminDecision = req.body.approvalStatus
    const inputRequestID = req.body.requestID

    // process request form cannot be empty
    if(adminDecision !== 1 && adminDecision !== 0){
        return res.json({
            missing: "Please select approve or reject first!"
        })
    }
    else{
        try{
            const matchedRequest = await ThreadRequest.findOne({_id: inputRequestID})
            if(matchedRequest.approvalStatus === "pending"){
                matchedRequest.approvalStatus = adminDecision ? "Approved" : "Rejected"
                await matchedRequest.save()
                if(matchedRequest.approvalStatus == "Approved"){
                    const newMegathread = new Megathread({
                        gamename: matchedRequest.gameName,
                        moderators: []
                    })
                    await newMegathread.save()
                    return res.json({
                        newMegathread: newMegathread,
                        success: "Approval status updated!"
                    })
                }
                else{
                    return res.json({
                        success: "Approval status updated!"
                    })
                }
            }
            // this request has been handled already
            else{
                return res.json({
                    alreadyProcessed: "This request has already been processed!"
                })
            }
        } catch(err){
            console.error(err)
            return res.status(400).json({
                error: err,
                status: "failed to save megathread requested",
            })
        }
        // find the matching request based on ID
        
// ThreadRequest.findOne({_id: inputRequestID}, (err, result) => {
//     // something wrong while quering the DB
//     if(err){
//         console.log(err)
//     }
//     else{
//         const matchedRequest = result
//         // update request's approval status based on admin's decision
//         if(matchedRequest.approvalStatus === "pending"){
//             matchedRequest.approvalStatus = adminDecision ? "Approved" : "Rejected"
//             await matchedRequest.save()
//             if(matchedRequest.approvalStatus == "Approved"){
//                 const newMegathread = new Megathread({
//                     gamename: gameName,
//                     moderators: []
//                 })
//                 await newMegathread.save()
//             }
//             return res.json({
//                 success: "Approval status updated!"
//             })
//         }
//         // this request has been handled already
//         else{
//             return res.json({
//                 alreadyProcessed: "This request has already been processed!"
//             })
//         }
//     }
// })
    }
})

// show user's submitted thread requests in Account page
app.post("/account", (req, res) => {
    const userID = req.body.userID

    ThreadRequest.find({requestedUserId: userID}, (err, result) => {
        // something wrong while querying the DB
        if(err){
            console.log(err)
        }
        // return a list of thread requests submitted by this user 
        else{
            return res.json({
                threadRequestList: result
            })
        }
    })
})

// edit profile photo
app.post("/profile", (req, res) => {
    const username = req.body.username.toLowerCase()
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
        // user found, set profile photo
        else{
          user.photo = req.photo
        }
    })          
})

// export the express app created to make it available to other modules
module.exports = app