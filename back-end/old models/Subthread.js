const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Comment = require("./Comment")

const subthreadSchema = new Schema(
    {
        game_id:{
            type: Number,
            required: true
        },
        post_id:{
            type: Number,
            required: true
        },
        comments:{
            type: [ Comment ],
            required: true
        }
    }
)

// create mongoose model
const Subthread = mongoose.model("Subthread", subthreadSchema);

// export the model so other modules can import it
module.exports = {
    Subthread,
};
