const mongoose = require("mongoose");

const { Schema } = mongoose;

const DataSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId, // Fixed incorrect reference
        ref: "User",
        required: true,
    },
    website: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    });

const Data = mongoose.model("Data", DataSchema);
module.exports = Data;