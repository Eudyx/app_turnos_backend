const Area = require('../models/areaModel');

const getAllAreas = async (req, res, next) => {
    try {
        const allAreas = await Area.find();
        if(!allAreas) return res.status(204).json({ 'message': 'No content' });
        console.log(allAreas);
        res.json(allAreas);
    } catch (err) {
        console.error(err);
    }
}

const getAreaById = async (req, res, next) => {
    const { id } = req.params;
    if(!id) return res.status(400).json({ 'message': 'ID param is required' });
    
    try {
        const foundArea = await Area.findById(id).exec();
        if(!foundArea) return res.status(204).json({ 'message': 'Area does not exist' });
        console.log(foundArea);
        res.json(foundArea);
    } catch (err) {
        console.error(err);
    }
}

const createArea = async (req, res, next) => {
    const { area_name, area_code } = req.body;
    if(!area_name || !area_code ) return res.status(400).json({ 'message': 'All the fields are required' });

    try {
        const result = await Area.create({
            area_name,
            area_code
        });

        const response = { 
            message: 'Area created',
            result
        }

        console.log(response);
        res.json(response);
    } catch (err) {
        console.error(err);
    }
}

module.exports = {
    getAllAreas,
    getAreaById,
    createArea
}