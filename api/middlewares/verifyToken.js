const jwtSupport = require('../util/jwtSupport');

function verifyToken(req, res, next) {

    const token = req.headers.bearer;
    let verification = jwtSupport.verifyToken(token);

    if (verification.ok) {
        req.decoded = verification.message;
        return next();
    } else {
        res.json(verification);
    }
}

module.exports = verifyToken;