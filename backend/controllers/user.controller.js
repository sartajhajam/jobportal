import {User} from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const register = async (req, resp) => {
    try {
        const { fullName, email, phoneNumber, } = req.body;
        if (!fullName || !email || !phoneNumber || !password || !role) {
            return res.status(404).json({
                message: "Missing required fields",
                success: false,
            });
        }
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: "Email already exists",
                success: false,
            });
        }
        // convert password to hashes 
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            fullName,
            email,
            phoneNumber,
            password: hashedPassword,
            role,
        });
        res.status(200).json({
            message: `Account Created successfuly  ${fullName}`,
            success: true,
        });


    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server Error",
            success: false,
        });

    }
};

export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        if (!email || !password || !role) {
            return res.status(404).json({
                message: "Missing required fields",
                success: false,
            });
        }
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                message: "Incorrect email or password",
                success: false,
            });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(404).json({
                message: "Incorrect email or password",
                success: false,
            });
        }
        // check role correctly or not 
        if (user.role !== role) {
            return res.status(403).json({
                message: " You dont have the necesary role to access thos resource",
                success: false,
            });
        }
        // generate token
        const tokenData = {
            userId: user_Id,

        };
        const token = await jwt.sign(tokenData, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });

        user = {
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        };



        return res
            .status(200)
            .cookie("token", token, {
                maxAge: 1 * 24 * 60 * 60 * 1000,
                httpOnly: true,
                sameSite: strict
            })
            .json({
                message: `Welcome back ${user.fullName}`,
                user,
                success: true,
            });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server Error Login",
            success: false,
        });

    }
};
// for logout 
export const logout = (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "Logged Out Scuccessfully",
            success: true,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server Error Logout",
            success: false,
        });
    }

};

export const updatedProfile = async (req, res) => {
    try {
        const { fullName, email, phoneNumber, bio, skills } = req.body;
        const file = req.file;
        if (!fullName || !email || !phoneNumber || !bio || !skills) {
            return res.status(404).json({
                message: "Missing required fields",
                success: false,
            });

        }

        // cloudnary upload 






        const skillsArray = skills.split(",");
        const userId = req.id; // middleware authentication
        let user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false,
            });
        }


        user.fullName = fullName;
        user.email = email;
        user.phoneNumber = phoneNumber;
        user.bio = bio;
        user.skills = skillsArray;
        // resume 
        await user.save();

        user = {
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        };

        return res.status(200).json({
            message:"Profile updated successfully",
            user,
            success:true,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server Error updating profile",
            success: false
        });

    }
};