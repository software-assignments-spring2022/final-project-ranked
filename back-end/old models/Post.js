const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    game_id: {
      type: Number,
      required: true,
    },
    post_id: {
      type: Number,
      required: true,
    },
    user_id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    tags: {
      type: [ String ],
      required: true,
    },
    likes: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        require: true
    }
  },
  {
    timestamps: true,
  }
);

// create mongoose Model
const Post = mongoose.model("Post", postSchema);

// export the model so other modules can import it
module.exports = {
    Post,
};
