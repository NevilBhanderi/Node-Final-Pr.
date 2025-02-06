const mongoose = require("mongoose");

const adminSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
})

const admin = mongoose.model("Full Stack Final", adminSchema);

module.exports = admin