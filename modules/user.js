const User = require("../models/user");
const ErrorHandler = require("../utils/errorHandler");
const cloudinary = require('cloudinary');
exports.registerUser = async (req, res, next) => {
    // console.log("im in register");
    // console.log("body", req.body);
    try {
        let { firstName, lastName, phoneNo, dateOfBirth, gender, lastQualification, avatar } = req.body;

        const oldUser = await User.findOne({ phoneNo })
        if (oldUser) {
            return next(new ErrorHandler('You already registered..please log in', 400));
        }
        if (avatar == "/images/default_avatar.jpg") {
            var user = await User.create({
                firstName,
                lastName,
                phoneNo,
                dateOfBirth,
                gender,
                lastQualification,
                avatar: {
                    public_id: "avatars/default_avatar_zvlo1q",
                    url: "https://res.cloudinary.com/daeuzh0zl/image/upload/v1641879724/default_avatar_wzezlf.jpg"
                }
            })
        } else {
            console.log('im in else')
            console.log('avatar', avatar);
            const result = await cloudinary.v2.uploader.upload(avatar, {
                folder: "avatars",
                width: 150,
                crop: "scale"
            })
            var user = await User.create({
                firstName,
                lastName,
                phoneNo,
                dateOfBirth,
                gender,
                lastQualification,
                avatar: {
                    public_id: result.public_id,
                    url: result.secure_url
                }
            })
        }
        const token = await user.getJwtToken();
        console.log("token", token);
        res.send({
            user,
            token,
            success: true
        })
    } catch (error) {
        console.log("error", error)
        res.send({
            success: false,
            error,
            errMessage: error.message,
            stack: error.stack
        })
    }
}

exports.validateUser = async (req, res, next) => {
    console.log("im in validate user");
    console.log("body", req.body);
    try {
        const { phoneNo, dateOfBirth } = req.body;
        if (!phoneNo || !dateOfBirth) {
            return next(new ErrorHandler('please enter all credentials', 400));
        }
        const user = await User.findOne({ phoneNo })
        if (user == null) {
            return next(new ErrorHandler('Invalid credentials', 400));
        }
        console.log("user dob", Date.parse(user.dateOfBirth));
        console.log("dateOfBirth", Date.parse(dateOfBirth))
        if (Date.parse(user.dateOfBirth) !== Date.parse(dateOfBirth)) {
            return next(new ErrorHandler('Invalid credentials', 400));
        }
        const token = await user.getJwtToken();
        console.log("takencame", token)
        res.send({
            user,
            token,
            success: true
        })
    } catch (error) {
        console.log("error", error)
        res.send({
            success: false,
            error,
            errMessage: error.message,
            stack: error.stack
        })
    }
}

exports.editUser = async (req, res, next) => {
    try {
        console.log("id", req.user.id);
        console.log("body", req.body);
        let { firstName, lastName, dateOfBirth, lastQualification } = req.body;
        const newUserData = {
            firstName,
            lastName,
            dateOfBirth,
            lastQualification,
        }
        const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
            new: true,
            runValidators: true,
            useFindAndModify: false
        })
        console.log("user", user)
        res.status(200).json({
            success: true, user
        })
    } catch (error) {
        res.send({
            success: false,
            error,
            errMessage: error.message,
            stack: error.stack
        })
    }
}

exports.getAllUsers = async (req, res, next) => {
    console.log("im in get all users");
    try {
        const users = await User.find({});
        console.log("users", users);
        res.status(200).json({
            success: true, users
        })
    } catch (error) {
        console.log("error", error);
        res.send({
            success: false,
            error,
            errMessage: error.message,
            stack: error.stack
        })
    }
}

exports.deleteUsers = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        console.log("user", user);
        if (user == null) {
            return next(new ErrorHandler('User doesnt exist', 400));
        }
        await user.remove();
        res.status(200).json({
            success: true
        })
    } catch (error) {
        console.log("error", error);
        res.send({
            success: false,
            error,
            errMessage: error.message,
            stack: error.stack
        })
    }
}