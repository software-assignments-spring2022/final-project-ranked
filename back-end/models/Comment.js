const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
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
    reply_to: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
      required: false
    },
    post_to: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
      required: false
    }
  },
  {
    timestamps: true,
  }
);

// create mongoose Model
const Comment = mongoose.model("Comment", commentSchema);

// export the model so other modules can import it
module.exports = {
  Comment,
};
