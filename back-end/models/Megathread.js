const mongoose = require('mongoose')
const Schema = mongoose.Schema

const megathreadSchema = new Schema(
    {
        gamename: {
            type: String,
            required: true
        },
        moderators: {
            type: [ mongoose.Schema.Types.ObjectId ], ref: 'User'
        }
    }
)

const Megathread = mongoose.model('Megathread', megathreadSchema)

module.exports = {
    Megathread
}