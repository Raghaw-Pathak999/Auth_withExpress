const JWT = require('jsonwebtoken');

const jwtAuth = (req, res, next)=>{
    const token = (req.cookies && req.cookies.token) || null;

    if (!token){
        return res.status(400).json({
            success: false,
            message:"token don't HERE"
        })
    }

    try {
        const payload = JWT.verify(token, process.env.SECRET);
        req.user = { id: payload.id, username: payload.username };
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
    next();
}

module.exports = jwtAuth