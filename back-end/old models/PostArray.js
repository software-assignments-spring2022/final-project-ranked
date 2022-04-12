const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Megathread = require("./Megathread")

const postArraySchema = new Schema(
  {
      type:{
          type: String,
          default: "posts",
          required: true
      },
      arr:{
          type: [ Megathread ],
          required: true
      }
  }
);

// create mongoose Model
const PostArray = mongoose.model("PostArray", postArraySchema);

// export the model so other modules can import it
module.exports = {
    PostArray,
};
