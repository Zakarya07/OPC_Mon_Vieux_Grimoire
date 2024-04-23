const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        console.log('Token:' + token);
        const decoded_token = jwt.verify(token, "TOKEN_SECRET_KEY");
        console.log('Decoded Token:' + decoded_token);
        const userId = decoded_token.userId;
        req.auth = {
            userId: userId
        }
        next();
    } catch (error) {
        console.error("Authentification error:" + error);
        res.status(401).json({ error });
    }
}