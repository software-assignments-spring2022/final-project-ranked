const mongoose = require('mongoose')
URLSlugs = require('mongoose-url-slugs');
const Schema = mongoose.Schema

const postSchema = new Schema(
    {
        game_id: {type: Number, required: true},
        user_id: {type: String, required: true},
        post_id: {type: Number, requireed: true},
        title: {type: String},
        body: {type: String},
        tags: [{type: String}],
        time: {type: String},
        likes: {type: Number},
        likedUsers: [],
        image: {type: String},
        comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
    }
)

const Post = mongoose.model('Post', postSchema)

module.exports = {
    Post
}
