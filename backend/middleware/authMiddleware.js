const jwt = require("jsonwebtoken");    // Import the jsonwebtoken library to handle JWT creation and verification
const db = require("../config/db");        // Import the database configuration to interact with the database

// Middleware function to verify JWT tokens for protected routes
// A middleware is a function that runs between receiving the request and sending the response.

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            message: "No token provided"
        });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(         // checks if the token is valid and not expired, and returns the decoded payload (user id and role) if the token is valid, otherwise it throws an error
            token,
            process.env.JWT_SECRET
        );

        req.user = decoded;

        next();
    } catch (error) {
        return res.status(401).json({
            message: "Invalid token"
        });
    }
};

module.exports = verifyToken;