const mongoose = require("mongoose");

const Roleshema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true,

    }
});

module.exports = mongoose.model("Role", Roleshema);