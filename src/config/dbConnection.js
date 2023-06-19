const mongoose = require('mongoose');

const dbCon = async () => {
    try {
        await mongoose.connect(process.env.DB_CONNECTION, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
    } catch (err) {
        console.error(err);
    }
}

module.exports = dbCon;