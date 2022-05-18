import User from "../models/User.js";

export const updateUser = async (req, res, next) => {
    try {
        const updatedUser = await User.findOneAndUpdate({ _id: req.params.id},
             req.body , {new: true}
        );
        res.status(200).json({
            updatedUser,
            message: 'updated successfully!'
        })
    } catch (error) {
        next(error);
    }
}

export const deleteUser = async (req, res, next) => {
    try {
        await User.findOneAndDelete({
            _id: req.params.id
        });
        res.status(200).json({
            message: "user deleted successfully"
        })
    } catch (error) {
        next(error);
    }
}

export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById({
            _id: req.params.id
        });
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
}

export const getUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
}
