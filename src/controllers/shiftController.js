const Shift = require('../models/shiftModel');

const getAllShifts = async (req, res, next) => {
    
    const { limit } = req.query;

    try {
        const allShift = await Shift.find().limit(limit);
        if(!allShift) return res.status(204).json({ 'message': 'No content' });

        console.log(allShift);

        res.json(allShift);
    } catch (err) {
        console.error(err);
    }
}

const getShifts = async () => {
    try {
       const shift = await Shift.find();
       return shift;
    } catch (err) {
        console.error(err);
    }
}

const getFirsShift = async (req, res, next) => {
    try {
        const foundShift = await Shift.findOne({}).sort({ number: -1 }).exec();
        if(!foundShift) return res.sendStaus(400);

        res.json(foundShift);
    } catch (err) {
        console.error(err);
    }
}

const saveShift = async (data) => {
    let number = 1;
    try {
        const foundShift = await Shift.findOne({}).sort({ number: -1 }).exec();
        if(foundShift) number = foundShift.number + 1;
    } catch (err) {
        console.error(err);
    }
    

    try {
        await Shift.create({
            shift: data.shift,
            number,
            area: data.area
        })
    } catch (err) {
        console.error(err);
    }
}

const deleteShift = async (data) => {
    try {
        const shift = await Shift.deleteOne({_id: data});
        return shift;
     } catch (err) {
         console.error(err);
     }
}

const deleteAllShift = async () => {
    try {
        const shift = await Shift.deleteMany({});
        return shift;
     } catch (err) {
         console.error(err);
     }
}

module.exports = {
    getAllShifts,
    getFirsShift,
    saveShift,
    deleteShift,
    getShifts,
    deleteAllShift
}