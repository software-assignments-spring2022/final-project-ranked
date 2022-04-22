const mongoose = require("mongoose")
const Schema = mongoose.Schema

const commentSchema = new Schema(
  {
    user_id: {
      type: String,
      required: true
    },
    user_image: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    },
    likes: {
      type: Number,
      required: true,
      default: 0
    },
    replyTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment'
    },
    postTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post'
    },
    time: {
      type: Date,
      required: true,
      default: Date.now()
    },
    replies: {
      type: [ this ],
      default: []
    }
  }
)

// create mongoose Model
const Comment = mongoose.model("Comment", commentSchema)

// export the model so other modules can import it
module.exports = {
  Comment,
}