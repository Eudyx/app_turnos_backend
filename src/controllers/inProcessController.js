const InProcess = require('../models/inProcessModel');

const getInProcess = async (req, res, next) => {
    
    const { limit } = req.query;

    try {
        const allProcess = await InProcess.find().limit(limit);
        if(!allProcess) return res.status(204).json({ 'message': 'No content' });

        console.log(allProcess);

        res.json(allProcess);
    } catch (err) {
        console.error(err);
    }
}

const getProcess = async () => {
    try {
       const process = await InProcess.find();
       return process;
    } catch (err) {
        console.error(err);
    }
}

const createInProcess = async (data) => {
    let number = 1;
    try {
        const foundShift = await InProcess.findOne({}).sort({ number: -1 }).exec();
        if(foundShift) number = foundShift.number + 1;
    } catch (err) {
        console.error(err);
    }
    

    try {
        await InProcess.create({
            shift: data.shift,
            number,
            area: data.area
        })
    } catch (err) {
        console.error(err);
    }
}

const deleteProcess = async (data) => {
    try {
        const process = await InProcess.deleteOne({area: data});
        return process;
     } catch (err) {
         console.error(err);
     }
}

const deleteAllProcess = async () => {
    try {
        const process = await InProcess.deleteMany({});
        return process;
     } catch (err) {
         console.error(err);
     }
}

module.exports = {
    createInProcess,
    getInProcess,
    getProcess,
    deleteProcess,
    deleteAllProcess
}