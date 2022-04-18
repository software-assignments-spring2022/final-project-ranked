const mongoose = require('mongoose')
const Schema = mongoose.Schema

const threadRequestSchema = new Schema(
    {
        gameName: {
            type: String,
            required: true
        },
        willModerate: {
            type: Number,
            required: true
        },
        friendsWillModerate: {
            type: Number,
            required: true
        },
        reason: {
            type: String,
            required: true
        },
        requestedUsername: {
            type: String,
            required: true
        },
        requestedUserId: {
            type: String,
            required: true
        },
        dateRequested: {
            type: String,
            required: true
        },
        approvalStatus: {
            type: String,
            required: true
        }
    }
)

// create mongoose Model
const ThreadRequest = mongoose.model('ThreadRequest', threadRequestSchema)

// export the model so we can import it in app.js
module.exports = {
    ThreadRequest
}