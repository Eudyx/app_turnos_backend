const mongoose = require('mongoose');
const { Schema } = mongoose;

const Shift = new Schema({
    shift: {
        type: String,
        require: true
    },
    number: {
        type: Number,
        require: true
    },
    area: {
        type: String,
        require: true
    }
});

module.exports = mongoose.model('Shift', Shift);