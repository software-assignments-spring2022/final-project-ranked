const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  joinDate: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: true,
    default:
      "data:image/pngbase64,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",
  },
})

// create mongoose Model
const User = mongoose.model("User", userSchema)

// export the model so we can import it in app.js
module.exports = {
  User,
}