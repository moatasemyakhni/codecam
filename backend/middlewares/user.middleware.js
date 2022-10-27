const jwt = require('jsonwebtoken');
const User = require('../models/User');

const userAuthMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if(!token) {
            throw {message: 'Unauthorized'};
        }
        const decoded = jwt.verify(token.split(" ")[1], process.env.USER_ACCESS_TOKEN);
        const user = await User.findOne({_id: decoded.userId});
        if(!user) throw {message: "Unauthorized"};

        next();
    } catch (error) {
        res.status(401).send({error: true, message: "Unauthorized"});
    }
}

module.exports = userAuthMiddleware;