const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Post = require("./Post")

const megathreadSchema = new Schema(
    {
        megathreadId:{
            type: Number,
            required: true
        },
        posts:{
            type: [ Post ],
            required: true
        }
    }
)

// create mongoose model
const Megathread = mongoose.model("Megathread", megathreadSchema);

// export the model so other modules can import it
module.exports = {
    Megathread,
};
