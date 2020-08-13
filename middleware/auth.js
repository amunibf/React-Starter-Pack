const config = require('config');
const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    const token = req.header('x-auth-token')
    //check for token
    if(!token) return res.status(401).json({ msg : 'No token, authorization denied'})
    /* if(!token){
        res.status(401).json({ msg : 'No token, authorization denied'})
    } */

    try {
        //verify token
        const decoded = jwt.verify(token, Buffer.from(config.get('jwtSecret'),"base64") /*new Buffer.from(config.get('jwtSecret'),"base64")*/)
        console.log(token);
        console.log(decoded)
        //add user from payload
        req.user=decoded
        next()
    } catch (error) {
        res.status(400).send({ msg : 'Token is not valid '})
    }
    
}

module.exports = auth
