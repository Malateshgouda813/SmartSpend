const User = require("../models/User");
const bcrypt = require("bcryptjs");
const registerUser = async (req, res) => {
    console.log("Register API hit");
    
    try {
        const { name, email, password } = req.body;

        console.log("Received:", name, email);

        const existingUser = await User.findOne({ email });

        console.log("User check completed");

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        const salt = await bcrypt.genSalt(10);

const hashedPassword = await bcrypt.hash(
    password,
    salt
);

const user = await User.create({
    name,
    email,
    password: hashedPassword
});

        console.log("User created");

        res.status(201).json({
            message: "User registered successfully",
            user
        });

    } catch (error) {
        console.log("ERROR:", error);
        res.status(500).json({
            message: error.message
        });
    }
};


//login user
const jwt = require("jsonwebtoken");

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "Invalid credentials"
            });
        }

        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid credentials"
            });
        }

        const token = jwt.sign(
            {
                id: user._id,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        res.status(200).json({
            message: "Login successful",
            token
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    registerUser,
    loginUser
};