const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true,
        },
        desc:{
            type: String,
            max: 500,
        },
        img:{
            type: String,
        },
        likes:{
            type: Array,
            required: true,
            default: [],
        }
});


module.exports = mongoose.model("Post", PostSchema);