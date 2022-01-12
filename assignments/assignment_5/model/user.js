const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    email: { type: String, unique: [true, "User already exists"], required: true },
    password: { type: String, required: true }
    });

module.exports = new mongoose.model("Users", userSchema);