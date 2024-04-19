const jwt = require("jsonwebtoken");

module.exports = (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded_token = jwt.verify(token, "TOKEN_SECRET_KEY");
        const userId = decoded_token.userId;
        req.auth = {
            userId: userId
        }
    } catch (error) {
        res.status(401).json({ error });
    }
}