const User = require('../models/userModel');

const handleLoing = async (req, res, next) => {
    const { user, password = '' } = req.body;
    if(!user || !password) return res.status(400).json({ "message": "User and password are required" });

    try {
        const foundUser = await User.findOne({ user: user }).exec();
        
        const match = foundUser.password === password;
        
        if(!match) return res.sendStatus(401);

        if(match) {
            if(!foundUser) return res.status(204).json({ "message": "The user does not exist" });
    
            console.log(foundUser);
    
            res.json({
                user: foundUser
             })
        }
    } catch (err) {
        console.error(err);
    }
    
}

module.exports = {
    handleLoing
}