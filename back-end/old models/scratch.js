const { Post } = require("./Post")

app.post(
  "/megathread/:gameId/subthread/:postId/comments/save",
  async (req, res) => {
    try {
      // try to save the comment to the database
      console.assert(!_.isEmpty(req.body.user))
      console.assert(!_.isEmpty(req.body.comment))
      var newComment = new Comment({
        user_id: req.body.user.username,
        text: req.body.comment,
      })
      req.body.replyTo == "root"
        ? (newComment.postTo = req.body.postId)
        : (newComment.replyTo = req.body.replyTo)
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

const populateReplies = async (e) => {
  for (i of e.comments) {
    i.replies = await Comment.find({ replyTo: i._id })
    populateReplies(i.replies)
  }
}

app.get("/:postId/comments", async (req, res) => {
  try {
    var comments = await Comment.find({ postTo: req.params.postId })
    populateReplies(comments)
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

app.post("/megathread/:gameId/subthread/:postId/comments/save", (req, res) => {
  // try to save the comment to the database
  try {
    fs.readFile("./comment.json", (err, data) => {
      if (err) {
        console.log(`an error occured while trying to read comment.json`)
      }
      var newComment = {
        comment_id: "",
        user_id: req.body.user,
        text: req.body.comment,
        time: "2048",
        likes: 0,
        replies: [],
      }
      // parse JSON object
      const commentJSON = JSON.parse(data)
      var commentArr = commentJSON.find(
        (element) =>
          element.game_id == req.params.gameId &&
          element.post_id == req.params.postId
      )
      // if the post isn't in comment.json yet
      if (!commentArr) {
        makePostComment({
          gameId: req.params.gameId,
          postId: req.params.postId,
          arr: commentJSON,
        })
      }
      commentArr = commentJSON.find(
        (element) =>
          element.game_id == req.params.gameId &&
          element.post_id == req.params.postId
      ).comments
      // if this is a reply to the post itself
      if (req.body.replyTo == "root") {
        addCommentRoot({
          arr: commentArr,
          root: `${req.params.gameId}:${req.params.postId}`,
          newComment: newComment,
        })
      }
      // if it is a reply to a comment
      else {
        var i_levels = 0
        const levels = getLevelIDs(req.body.replyTo)
        // reccursive function to add nested comment
        addComment({
          arr: commentArr,
          i_levels: i_levels,
          levels: levels,
          newComment: newComment,
        })
      }
      fs.writeFile(
        "./comment.json",
        JSON.stringify(commentJSON, null, 2),
        (err) => {
          if (err) {
            console.log(
              `an error occured while trying to write to comment.json`
            )
          }
          console.log("Data written to file")
        }
      )
      return res.json({
        comment: newComment, // return the message we just saved
        status: "all good",
      })
    })
  } catch (err) {
    console.error(err)
    return res.status(400).json({
      error: err,
      status: "failed to save the message to the database",
    })
  }
})


app.get("/megathread/:gameId/subthread/:postId/comments", (req, res) => {
    try {
      fs.readFile("./comment.json", (err, data) => {
        if (err) {
          throw err
        }
        var comments = []
        // parse JSON object
        const commentJSON = JSON.parse(data)
        comments = commentJSON.find(
          (element) =>
            element.game_id == req.params.gameId &&
            element.post_id == req.params.postId
        )
        // if couldn't find the post, return empty array
        typeof comments != "undefined"
          ? (comments = comments.comments)
          : (comments = [])
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