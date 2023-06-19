const Shift = require('../models/shiftModel');

const getAllShifts = async (req, res, next) => {
    try {
        const allShift = await Shift.find();
        if(!allShift) return res.status(204).json({ 'message': 'No content' });

        console.log(allShift);

        res.json(allShift);
    } catch (err) {
        console.error(err);
    }
}

module.exports = {
    getAllShifts
}