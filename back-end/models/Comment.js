const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    comment_id: {
      type: String,
      required: true
    },
    user_id: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    },
    time: {
      type: String,
      required: true
    },
    likes: {
      type: String,
      required: true
    },
    replies: {
      type: [ this ],
      required: true
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