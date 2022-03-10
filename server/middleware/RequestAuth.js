const jwt = require('jsonwebtoken');
const config = require('../config')

module.exports = (req, res, next) => {
    if (!req.headers.authorization) {
        res.status(401).send("Unauthorized")
    } else {
        jwt.verify(req.headers.authorization.split(' ')[1], config.secret, (err, decoded) => {
            //console.log(decoded.Rol)
            if (err) {
                res.status(403).send("Forbidden")
            } else {
                req.id = decoded.id;
                next()
            }
        })
    }
}