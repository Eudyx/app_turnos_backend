const mongoose = require('mongoose');
const { Schema } = mongoose;

const User = new Schema({
    user: {
        type: String,
        unique: true,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    areaName: {
        type: String,
        require: true
    }
});

module.exports = mongoose.model('User', User);