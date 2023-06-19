const User = require('../models/userModel');

const getAllUsers = async (req, res, next) => {
    try {
        const allUsers = await User.find();
        if(!allUsers) return res.status(204).json({ 'message': 'No content' });

        console.log(allUsers);

        res.json(allUsers);
    } catch (err) {
        console.error(err);
    }
}

const getUserById = async (req, res, next) => {
    const { id } = req.params;
    if(!id) return res.status(400).json({ 'message': 'ID param is required' });

    try {
        const foundUser = await User.findById(id).exec();
        if(!foundUser) return res.status(204).json({ 'message': 'User does not exist' });
        console.log(foundUser);
        res.json(foundUser);
    } catch (err) {
        console.error(err);
    }
}

const createUser = async (req, res, next) => {
    const { user, password, areaName } = req.body;
    if(!user || !password || !areaName) return res.status(400).json({ 'message': 'All the fields are required' });

    try {
        const result = await User.create({
            user,
            password,
            areaName
        });

        const response = { 
            message: 'User created',
            result
        }

        console.log(response);
        res.json(response);
    } catch (err) {
        console.error(err);
    }
}

module.exports = { 
    getAllUsers,
    getUserById,
    createUser
};