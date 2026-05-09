const moongoose = require("mongoose");
const RegisterSchema = new moongoose.Schema({
    user: {
        type: moongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    post: {
    type: moongoose.Schema.Types.ObjectId,
    ref: "Post",
},
});
module.exports = moongoose.model("Register", RegisterSchema);