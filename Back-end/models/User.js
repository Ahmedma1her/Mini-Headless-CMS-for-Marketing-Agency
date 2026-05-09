const mongoose = require("mongoose");

const Userschema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        required: true,
    },

    role: {
        type:mongoose.Schema.Types.ObjectId,
        ref: "Role",
    },

    timestamps: true
});

module.exports = mongoose.model("User", Usershema);