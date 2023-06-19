const mongoose = require('mongoose');
const { Schema } = mongoose;

// userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User'
// },

const Shift = new Schema({
    shift: {
        type: String,
        require: true
    }
});

module.exports = mongoose.model('Shift', Shift);