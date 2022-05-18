import bcrypt from 'bcryptjs';
import JWT from 'jsonwebtoken';
import User from "../models/User.js";
import { createError } from "../utils/error.js";

export const register = async (req, res, next) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(req.body.password, salt);
        
        const createdUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash
        });

        await createdUser.save();

        res.status(200).json({
            message: 'new user created successfully!'
        });

    } catch (error) {
        next(error);
    }
}

export const login = async (req, res, next) => {
    try {
        const user = await User.findOne({
            username: req.body.username
        });
        if(!user){
            return next(createError(404, 'user not found'));
        }
        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);

        if(!isPasswordCorrect){
            return next(createError(400, 'password mismatched!'))
        }

        const token = JWT.sign({ id: user._id, isAdmin: user.isAdmin}, process.env.JWT);

        const { password, isAdmin, ...others} = user._doc;

        return res.cookie("access_token", token, {
            httpOnly: true
        }).status(200).json({...others});
    } catch (error) {
        next(error);
    }
}