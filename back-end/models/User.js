const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema(
  {
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
    }
    /*
    likedPost:  [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
    likedComment: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
    */
  }
)

// create mongoose Model
const User = mongoose.model('User', userSchema)

// export the model so we can import it in app.js
module.exports = {
    User
}