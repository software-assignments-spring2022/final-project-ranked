const mongoose = require('mongoose')
URLSlugs = require('mongoose-url-slugs');
const Schema = mongoose.Schema

const userSchema = new Schema(
    {
        username: {type: String, required: true},
        password: {type: String, required: true},
        email: {type: String},
        likedPost:  [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
        likedComment: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
    }
)

const User = mongoose.model('User', userSchema)

module.exports = {
    User
}