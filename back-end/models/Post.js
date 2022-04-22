const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new Schema(
    {
        toMegathread: {type: mongoose.Schema.Types.ObjectId, ref: 'Megathread', required: true},
        user_id: {type: String, required: true},
        user_image: {type: String, required: true},
        title: {type: String, required: true},
        body: {type: String, required: true},
        tags: [{type: String, required: true}],
        time: {type: Date, default: Date.now(), required: true},
        likes: {type: Number, default: 0, required: true},
        // likedUsers: [],
        image: {type: String}
    }
)

const Post = mongoose.model('Post', postSchema)

module.exports = {
    Post
}
