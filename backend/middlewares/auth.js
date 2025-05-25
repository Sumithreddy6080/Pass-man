const jwt = require('jsonwebtoken'); 

const auth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader?.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;
        // console.log("Token:", token);
        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }
        // console.log(token)
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        // console.log("User authenticated:", req.user);
        next();
    } catch (error) {
        console.error("Authentication error:", error);
        return res.status(401).json({ message: `Unauthorized ${error.message}` });
    }
};

module.exports = auth;