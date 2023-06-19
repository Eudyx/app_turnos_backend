const mongoose = require('mongoose');
const { Schema } = mongoose;

const Area = new Schema({
    area_name: {
        type: String,
        require: true
    },
    area_code: {
        type: String,
        require: true
    }
});

module.exports = mongoose.model('Area', Area);