const mongoose = require('mongoose')
URLSlugs = require('mongoose-url-slugs');
const Schema = mongoose.Schema

const megathreadSchema = new Schema(
    {
        megathreadID: {type: Number, required: true},
        posts: {type: mongoose.Schema.Types.ObjectId, ref: 'Post'},
    },
    {
        _id: true
    }
)

const Megathread = mongoose.model('Megathread', megathreadSchema)

module.exports = {
    Megathread
}