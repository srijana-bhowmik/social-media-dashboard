const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/db");


// Register a new user-- post in postman
//  created API in postman: http://localhost:3000/api/auth/register
const register = async (req, res) => {      //every new user who registers is a viewer automatically
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        db.query(
            "SELECT * FROM users WHERE email = ?",
            [email],
            async (err, result) => {

                if (err) {
                    return res.status(500).json(err);
                }

                if (result.length > 0) {
                    return res.status(400).json({
                        message: "User already exists"
                    });
                }

                const hashedPassword =
                    await bcrypt.hash(password, 10);

                db.query(
                    "INSERT INTO users (name, email, password ) VALUES (?, ?, ?)",
                    [
                        name,
                        email,
                        hashedPassword 
                    ],
                    (err, result) => {

                        if (err) {
                            return res.status(500).json(err);
                        }

                        res.status(201).json({
                            message: "User registered successfully"
                        });
                    }
                );
            }
        );

    } catch (error) {
        res.status(500).json(error);
    }
};


//login
const login = (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({
            message: "Email and password are required"
        });
    }

    db.query(
        "SELECT * FROM users WHERE email = ?",
        [email],
        async (err, result) => {        //dataabase returns result, result is an array of users matching the email, should be 0 or 1
            if (err) {
                return res.status(500).json(err);
            }

            if (result.length === 0) {      // no user found with the provided email
                return res.status(400).json({
                    message: "User not found"
                });
            }

            const user = result[0];     // user is the first (and only) user in the result array, which contains the user's data including the hashed password

            const isMatch = await bcrypt.compare(        // compare the provided password with the hashed password in the database
                password,
                user.password               //bcrypt hashes the password and compares it to the stored hash, returns true if they match, false otherwise
            );

            if (!isMatch) {
                return res.status(400).json({
                    message: "Invalid credentials"
                });
            }

            const token = jwt.sign(         //backend gives the user a token that they can use to authenticate future requests, the token contains the user's id and role, and is signed with a secret key
                {
                    id: user.id,
                    role: user.role
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: "7d"
                }
            );

            res.status(200).json({
                message: "Login successful",
                token,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                }
            });
        }
    );
};


module.exports = {
    register,
    login
};
