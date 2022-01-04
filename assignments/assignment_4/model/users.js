const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    email: { type: String, unique: true},
    isPromoted: { type: Boolean }
});

const Users = mongoose.model("Users", userSchema);

module.exports = Users;