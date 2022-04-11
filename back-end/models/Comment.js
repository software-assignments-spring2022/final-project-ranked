const mongoose = require('mongoose')
URLSlugs = require('mongoose-url-slugs');
const Schema = mongoose.Schema

const commentSchema = new Schema(
    {
        comment_id: {type: String, required: true},
        user_id: {type: String, required: true},
        text: {type: String, requireed: true},
        time: {type: String},
        likes: {type: Number},
        likedUsers: [{type: String}],
        image: {type: String},
        replies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
    }
)

const Comment = mongoose.model('Comment', commentSchema)

module.exports = {
    Comment
}