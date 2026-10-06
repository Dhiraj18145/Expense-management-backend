const User = require("../models/user.model");
const { isValidEmail, isValidId } = require("../utils/validate.utils");

// Create User
const createuser = async (req, res, next) => {
    try {
        const { name, email } = req.body;

        if (!name || !email) {
            return res.status(400).json({
                success: false,
                message: "Name and email are required"
            });
        }

        if (!isValidEmail(email)) {
            return res.status(400).json({
                success: false,
                message: "Invalid email"
            });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "Email already exists"
            });
        }

        const newUser = await User.create({
            name,
            email
        });

        return res.status(201).json({
            success: true,
            message: "User created successfully",
            data: newUser
        });

    } catch (error) {
        next(error);
    }
};


// Get All Users
const getusers = async (req, res, next) => {
    try {
        const users = await User.find();

        return res.status(200).json({
            success: true,
            data: users
        });

    } catch (error) {
        next(error);
    }
};


// Get User By ID
const getuserById = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!isValidId(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid user ID"
            });
        }

        const foundUser = await User.findById(id);

        if (!foundUser) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        return res.status(200).json({
            success: true,
            data: foundUser
        });

    } catch (error) {
        next(error);
    }
};


module.exports = {
    createuser,
    getusers,
    getuserById
};