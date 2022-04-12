const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Subthread = require("./Subthread")

const commentArraySchema = new Schema(
  {
      type:{
          type: String,
          default: "comments",
          required: true
      },
      arr:{
          type: [ Subthread ],
          required: true
      }
  }
);

// create mongoose Model
const CommentArray = mongoose.model("CommentArray", commentArraySchema);

// export the model so other modules can import it
module.exports = {
    CommentArray,
};
